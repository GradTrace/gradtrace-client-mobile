import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Linking,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useState, useEffect } from "react";
import { LogBox } from "react-native";
import { Button } from "@rneui/themed";
import SuccessScreen from "../components/successScreen";

import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../Core/config";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/url";

LogBox.ignoreLogs(["Setting a timer"]);

export default function UploadTaskPage({ navigation, route }) {
  //STATES
  const [blobFile, setBlobFile] = useState(null);
  const [fileName, setFileName] = useState("No Files");
  const [isChoosed, setIsChoosed] = useState(false);
  const [uploadCompleted, isUploadCompleted] = useState(false);
  const [uploadStart, setUploadStart] = useState(false);
  const [urlfirebasegained, seturlfirebasegained] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // Upload File Firebase
  const uploadFileToFirebase = (blobFile, fileName, isUploadCompleted) => {
    if (!blobFile) return;
    const sotrageRef = ref(storage, `myDocs/${fileName}`);
    const uploadTask = uploadBytesResumable(sotrageRef, blobFile);

    uploadTask.on(
      "state_changed",
      null,
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          seturlfirebasegained(downloadURL);
          isUploadCompleted(true);
          return downloadURL;
        });
      }
    );
  };

  const deleteFileFromFirebase = (fileNameFirebase) => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, `myDocs/${fileNameFirebase}`);

    // Delete the file
    // setFileName("No Files");
    // navigation.setParams({ url: "none" });

    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log(`ini masok ke berhasil delet`);
        deletedFile(accessToken);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error, `<< ini eror message kalo gagal delet`);
      });
  };

  //HOOKS
  useEffect(() => {
    if (uploadCompleted) {
      showToastWithGravityAndOffset("Document Saved SuccessFully");
      clearFiles();
    }
  }, [uploadCompleted]);

  //FUNCTIONS
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result != null) {
      const r = await fetch(result.uri);

      const b = await r.blob();
      setFileName(result.name);
      setBlobFile(b);
      setIsChoosed(true);
    }
  };

  const clearFiles = () => {
    setFileName("No Files");
    setBlobFile(null);
    setIsChoosed(false);
  };

  const uploadFilePress = () => {
    if (blobFile) {
      showToastWithGravityAndOffset("Uploading File....");
      setUploadStart(true);

      uploadFileToFirebase(blobFile, fileName, isUploadCompleted);

      seturlfirebasegained(
        uploadFileToFirebase(blobFile, fileName, isUploadCompleted)
      );

      clearFiles();
    }
  };

  useEffect(() => {
    if (urlfirebasegained) {
      // Make API call
      updateTaskUrl(accessToken);
    }
  }, [urlfirebasegained]);

  // GET ACCESS TOKEN
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");

      if (jsonValue) {
        const result = JSON.parse(jsonValue);
        setAccessToken(result.access_token);
        // getTasks(result.access_token);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // PATCH ASSIGNMENT URL
  const updateTaskUrl = async (access_token) => {
    try {
      const result = await axios({
        method: "PATCH",
        url: `${url}/students/tasks/${route.params.id}`,
        headers: {
          access_token,
        },
        data: {
          url: urlfirebasegained,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Delete task method
  const deletedFile = async (access_token) => {
    // setFileName("No Files");
    try {
      await axios({
        method: "PATCH",
        url: `${url}/students/tasks/${route.params.id}`,
        headers: {
          access_token,
        },
        data: {
          url: "none",
        },
      });

      navigation.setParams({ url: "none" });
    } catch (err) {
      console.log(err);
    }
  };

  const showToastWithGravityAndOffset = (msg = "") => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  // Format file name
  const str = route.params.url.match(new RegExp("/myDocs%2F([^?]+)"));

  // Delete confirmation alert
  const deleteAlert = () => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure want to delete this file?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => deleteFileFromFirebase(`${str[1]}`),
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      {uploadStart ? (
        <SuccessScreen uploaded={uploadCompleted} />
      ) : (
        <>
          {/* <Text>Ini IDnya: {route.params.id}</Text> */}
          {/* <Text>Ini URLnya: {route.params.url}</Text> */}

          {/* Student can delete the old assignment and update it with the new one */}
          {route.params.url != "none" ? (
            <View style={{ alignItems: "center" }}>
              <Text style={styles.textStyle}>File name:</Text>
              <Text style={styles.textStyle}>{str[1]}</Text>
              <Button
                title={"View file"}
                onPress={() => Linking.openURL(`${route.params.url}`)}
                buttonStyle={{
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
              <Button
                onPress={deleteAlert}
                title="Delete File"
                buttonStyle={{
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => pickDocument()}>
                  <FontAwesome5 name="file-upload" size={50} color="black" />
                </TouchableOpacity>
              </View>

              {fileName === "No Files" ? (
                <Text style={styles.textStyle}>
                  Click here to upload your assignment
                </Text>
              ) : (
                <>
                  <Text style={styles.textStyle}>File name:</Text>
                  <Text style={{ fontSize: 18 }}>{fileName}</Text>
                  {isChoosed ? (
                    <View style={{ marginTop: 20 }}>
                      <Button
                        title={"Upload"}
                        onPress={() => uploadFilePress()}
                        buttonStyle={{
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  ) : null}
                </>
              )}
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 18,
  },
  btnStyle: {
    height: 50,
    width: 150,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTextStyle: {
    color: "white",
    fontSize: 20,
  },
  btnContainer: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
