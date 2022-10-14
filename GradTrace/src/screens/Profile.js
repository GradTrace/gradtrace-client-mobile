import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Avatar, Card, Chip } from "@rneui/themed";
import { useState, useCallback } from "react";
import { url } from "../../constants/url";
import IonIcons from "react-native-vector-icons/Ionicons";

import ScoreCard from "../components/ScoreCard";

import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [accessToken, setAccessToken] = useState("");
  const [studentProfile, setStudentProfile] = useState({});
  const [examScores, setExamScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get access token, get student profile, get student exam scores
  const getData = async () => {
    try {
      setIsLoading(true);
      const jsonValue = await AsyncStorage.getItem("@storage_Key");

      if (jsonValue) {
        const result = JSON.parse(jsonValue);
        setAccessToken(result.access_token);
        getUserProfile(result.access_token);
        getExamScores(result.access_token);
        setIsLoading(false);
      } else {
        console.log("error");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  // Get student profile function
  const getUserProfile = async (access_token) => {
    try {
      const result = await axios({
        method: "GET",
        url: `${url}/students/profile`,
        headers: {
          access_token,
        },
      });
      setStudentProfile(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Get student exam scores function
  const getExamScores = async (access_token) => {
    try {
      const result = await axios({
        method: "GET",
        url: `${url}/students/scores`,
        headers: {
          access_token,
        },
      });
      setExamScores(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "lightblue",
        }}
      >
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  // Card to be rendered
  const card = ({ item }) => <ScoreCard item={item} />;

  return (
    <View style={styles.content}>
      <Card containerStyle={styles.cardContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            size={110}
            rounded
            title="Profile Picture"
            source={{
              uri: studentProfile.photo
                ? studentProfile.photo
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
            }}
          />
          <View style={{ marginStart: 8, alignSelf: "auto" }}>
            <Text style={styles.name}>{studentProfile.fullName}</Text>

            <Chip
              title={`Class ${studentProfile.className}`}
              containerStyle={{ marginHorizontal: 20 }}
            />

            {/* <Text>Class {}</Text> */}

            <View style={styles.itemRow}>
              <IonIcons name={"mail-outline"} size={22} />
              <Text style={styles.text}>{studentProfile.email}</Text>
            </View>

            <View style={styles.itemRow}>
              <IonIcons name={"home-outline"} size={22} />
              <Text style={styles.text}>
                {studentProfile.address ? studentProfile.address : " -"}
              </Text>
            </View>

            <View style={styles.itemRow}>
              <IonIcons name={"call-outline"} size={22} />
              <Text style={styles.text}>
                {studentProfile.phoneNumber ? studentProfile.phoneNumber : " -"}
              </Text>
            </View>

            <View style={styles.itemRow}>
              {studentProfile.gender === "Male" ? (
                <IonIcons name={"male"} size={22} />
              ) : (
                <IonIcons name={"female"} size={22} />
              )}
              <Text style={styles.text}>{studentProfile.gender}</Text>
            </View>
          </View>
        </View>
      </Card>

      <View style={styles.bottomContent}>
        <FlatList
          data={examScores}
          renderItem={card}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
    marginBottom: 2,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  topContentContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  studentData: {
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    marginStart: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    marginStart: 10,
  },

  bottomContent: {
    flex: 10,
    backgroundColor: "lightblue",
    width: "100%",
  },
  itemRow: {
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 1,
    flexDirection: "row",
  },
});
