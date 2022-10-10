import { View, StyleSheet, Text } from "react-native";
import { Avatar, Button, Card } from "@rneui/themed";
import { useState, useEffect, useCallback } from "react";
import { url } from "../../constants/url";

import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {

  const [accessToken, setAccessToken] = useState("");
  const [studentProfile, setStudentProfile] = useState({});

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");

      if (jsonValue) {
        const result = JSON.parse(jsonValue);
        setAccessToken(result.access_token);
        getUserProfile(result.access_token);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

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

  if (!studentProfile) {
    return <Text>Loading...</Text>
  }


  return (
    <View style={styles.topContent}>
      <View style={styles.topContentContainer}>
        <Avatar
          size={90}
          rounded
          title="Profile Picture"
          source={{
            // uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
            uri: studentProfile.photo
          }}
        />
        <View style={styles.studentData}>
          <Text style={styles.name}>{studentProfile.fullName}</Text>
          <Text style={styles.class}>Class : {studentProfile.className}</Text>
          <Text style={styles.email}>{studentProfile.email}</Text>
          <Text style={styles.email}>{studentProfile.address}</Text>
          <Text style={styles.email}>{studentProfile.phoneNumber}</Text>
          <Text style={styles.email}>{studentProfile.gender}</Text>

        </View>
      </View>

      <View style={styles.bottomContent}>
        <View>
          <Text>Hola salam Jas TOk</Text>
        </View>
        <Card>
          <Text>Daftar Nilai Siswa : </Text>
          <Text>Nilai Tugas : </Text>
          <Text>Nilai Ulangan Harian : </Text>
          <Text>Nilai UTS : </Text>
          <Text>Nilai UAS : </Text>
          <Text>Nilai Akhir : </Text>

        </Card>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  topContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 22,
    marginStart: 20,
    fontWeight: "bold",
  },
  class: {
    fontSize: 18,
    marginStart: 20,
  },
  email: {
    fontSize: 14,
    marginStart: 20,
  },
  bottomContent: {
    flex: 10,
    backgroundColor: "lightgrey",
    width: "100%",
  },
});
