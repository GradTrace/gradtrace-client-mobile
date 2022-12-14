import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Button } from "@rneui/themed";
import * as Location from "expo-location";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { distKM } from "../../helpers/calculateRadiusRange";
import {
  latitudeSchool,
  longitudeSchool,
} from "../../constants/schoolCoordinate";

export default function ScanAttendance({ navigation }) {
  const goToAttendance = () => {
    navigation.navigate("Attendance");
  };

  const [accessToken, setAccessToken] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [userLocation, setUserLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not ready");
  const [location, setLocation] = useState({});

  // Get access_token
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");

      if (jsonValue) {
        const result = JSON.parse(jsonValue);
        setAccessToken(result.access_token);
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

  // Get current location
  async function GetCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const resultDistanceInKm = distKM(
        latitudeSchool,
        longitudeSchool,
        latitude,
        longitude
      );

      const limitMax200mLoc = 0.2; //max 200 m
      if (resultDistanceInKm > limitMax200mLoc) {
        goToAttendance();
        Alert.alert(`Error`, "You need to get closer to to your school");
      }
      // Set location
      setLocation((prevState) => ({
        ...prevState,
        lon: longitude,
        lat: latitude,
      }));

      setText("Ready to scan new attendance");

      // for (let item of response) {
      //   const address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.district}, ${item.city}, ${item.subregion}, ${item.region}, ${item.country}  Lat: ${latitude}, Long: ${longitude}, `;

      //   setUserLocation(address);
      // }
    }
  }

  // QR scan
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    GetCurrentLocation();
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    postAttendance(data);
  };

  // Check for camera permission
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Fail to access camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Post attendance
  async function postAttendance(data) {
    try {
      const result = await axios({
        method: "POST",
        url: data,
        headers: {
          access_token: accessToken,
        },
        data: {
          dateAndTime: new Date(),
          lon: location.lon,
          lat: location.lat,
        },
      });
      navigation.navigate("Attendance");
      console.log(data);
    } catch (err) {
      console.log(err, "<<< err");
      Alert.alert("Error", err.response.data.message);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View style={{ marginBottom: 10 }}></View>
          <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ width: 550, height: 550 }}
            />
          </View>
        </View>
      </View>

      <Text style={styles.mainText}>{text}</Text>
      <Button
        title={"Back"}
        buttonStyle={{
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("Attendance")}
      />
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
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "tomato",
  },
  mainText: {
    fontSize: 16,
    margin: 20,
  },
  floatingButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
  },
});
