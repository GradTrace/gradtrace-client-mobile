import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Avatar, Card } from "@rneui/themed";
import { useState, useCallback } from "react";
import { url } from "../../constants/url";

import ScoreCard from "../components/ScoreCard";

import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [accessToken, setAccessToken] = useState("");
  const [studentProfile, setStudentProfile] = useState({});
  const [examScores, setExamScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //! nilai tugas belum di get
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

  // console.log(examScores);
  return (
    <View style={styles.content}>
      <View style={styles.topContentContainer}>
        {/* <Card containerStyle={styles.cardContainer}> */}
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
        <View style={styles.studentData}>
          <Text style={styles.name}>{studentProfile.fullName}</Text>
          <Text style={styles.class}>Class : {studentProfile.className}</Text>
          <Text style={styles.email}>Email: {studentProfile.email}</Text>
          <Text style={styles.email}>
            Address: {studentProfile.address ? studentProfile.address : " -"}
          </Text>
          <Text style={styles.email}>
            Phone number:{" "}
            {studentProfile.phoneNumber ? studentProfile.phoneNumber : " -"}
          </Text>
          <Text style={styles.email}>Gender: {studentProfile.gender}</Text>
        </View>
        {/* </Card> */}
      </View>

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
    borderRadius: 10,
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
    flex: 3.2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  studentData: {
    justifyContent: "center",
  },
  name: {
    fontSize: 22,
    marginStart: 20,
    fontWeight: "bold",
  },
  class: {
    fontSize: 14,
    marginStart: 20,
  },
  email: {
    fontSize: 14,
    marginStart: 20,
  },
  bottomContent: {
    flex: 10,
    backgroundColor: "lightblue",
    width: "100%",
  },
});
