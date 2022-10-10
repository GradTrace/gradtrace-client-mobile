import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Button,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useState, useEffect } from "react";
import { LogBox } from "react-native";
import SuccessScreen from "../components/successScreen";

import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
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
    deleteObject(desertRef).then(() => {
      // File deleted successfully
      console.log(`ini masok ke berhasil delet`)
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error, `<< ini eror message kalo gagal delet`)
    });

  }

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

      seturlfirebasegained(uploadFileToFirebase(blobFile, fileName, isUploadCompleted));

      clearFiles();
    }
  };

  useEffect(() => {
    if (urlfirebasegained) {
      // Make API call
      updateTaskUrl(accessToken);
    }
  }, [urlfirebasegained]);

  // console.log(urlfirebasegained, "<<< ini hasil URL");
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

  const showToastWithGravityAndOffset = (msg = "") => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  return (
    <View style={styles.container}>
      {uploadStart ? (
        <SuccessScreen uploaded={uploadCompleted} />
      ) : (
        <>
          <Text>Ini IDnya: {route.params.id}</Text>
          <Button onPress={() => deleteFileFromFirebase('1601376263809.jpg')} title="Delete File" />
          <Button onPress={() => pickDocument()} title="Upload File" />
          <Text style={styles.textStyle}>{fileName}</Text>
          <View style={styles.btnContainer}>
            {isChoosed ? (
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => uploadFilePress()}
              >
                <Text style={styles.btnTextStyle}>Upload</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.textStyle}>Choose a File -- </Text>
            )}

            <TouchableOpacity onPress={() => pickDocument()}>
              <FontAwesome5 name="file-upload" size={60} color="black" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    padding: 10,
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
  },
});
