import { View, StyleSheet, Text, FlatList } from "react-native";
import { Button } from "@rneui/themed";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import AttendanceCard from "../components/AttendanceCard";

import { url } from "../../constants/url";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AttendanceScreen({ navigation }) {
  const goToAttendanceScan = () => {
    navigation.navigate("ScanAttendance");
  };

  const [accessToken, setAccessToken] = useState("");
  const [attendances, setAttendances] = useState({});

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");

      if (jsonValue) {
        const result = JSON.parse(jsonValue);
        setAccessToken(result.access_token);
        getAttendances(result.access_token);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  // Pakai useFocusEffect untuk "melakukan useEffect" saat terjadi perpindahan screen (atau dalam kata lain pindah dari focused screen jadi unfocused screen)
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  // Get attendance data
  const getAttendances = async (access_token) => {
    try {
      const result = await axios({
        method: "GET",
        url: `${url}/students/attendance`,
        headers: {
          access_token,
        },
      });
      setAttendances(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const card = ({ item }) => <AttendanceCard item={item} />;

  console.log(attendances, "<<<  attendances");

  if (Object.keys(attendances).length === 0) {
    return (
      <>
        <View style={styles.top}>
          <Button
            title="Scan QR"
            onPress={goToAttendanceScan}
            style={styles.scanButton}
          />
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.top}>
          <Button
            title="Scan QR"
            onPress={goToAttendanceScan}
            style={styles.scanButton}
          />
        </View>
        <View style={styles.container}>
          <FlatList
            data={attendances}
            renderItem={card}
            keyExtractor={(item) => item.id}
            style={styles.scrollview}
            contentContainerStyle={styles.containerStyle}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scanButton: {
    // flexDirection: "row-reverse",
    // marginStart: 200,
  },
  container: {
    flex: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerStyle: {
    width: "100%",
    paddingTop: 2,
    paddingBottom: 20,
    paddingHorizontal: 21,
  },
  scrollview: {
    backgroundColor: "lightgrey",
  },
});
