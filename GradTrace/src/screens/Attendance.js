import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState, useCallback } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  // Get access token and get student attendances
  const getData = async () => {
    try {
      setIsLoading(true);
      const jsonValue = await AsyncStorage.getItem("@storage_Key");

      if (jsonValue) {
        const result = JSON.parse(jsonValue);
        setAccessToken(result.access_token);
        getAttendances(result.access_token);
        setIsLoading(false);
      } else {
        Alert.alert("Error", err);
        console.log("Error set access_token");
      }
    } catch (err) {
      setIsLoading(false);
      Alert.alert("Error", err);
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  // Get attendance data function
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
      Alert.alert("Error", err);
      console.log(err);
    }
  };

  // Card to be rendered
  const card = ({ item }) => <AttendanceCard item={item} />;

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

  if (Object.keys(attendances).length === 0) {
    return (
      <View style={styles.emptyAttendanceContainer}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.touchableOpacityStyle}
            onPress={goToAttendanceScan}
          >
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png",
              }}
              style={styles.centerAddButton}
            />
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18 }}>
            Tap to add new absence
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <FlatList
            data={attendances}
            renderItem={card}
            keyExtractor={(item) => item.id}
            style={styles.scrollview}
            contentContainerStyle={styles.containerStyle}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.touchableOpacityStyle}
            onPressOut={goToAttendanceScan}
          >
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png",
              }}
              style={styles.floatingButtonStyle}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  emptyAttendanceContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  centerAddButton: {
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  containerStyle: {
    paddingTop: 0,
    paddingBottom: 20,
  },
  scrollview: {
    backgroundColor: "lightblue",
  },
  floatingButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 12,
    right: 12,
  },
});
