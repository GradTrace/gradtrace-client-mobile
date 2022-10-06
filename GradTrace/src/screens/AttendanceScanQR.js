import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";
import * as Location from "expo-location";

import axios from "axios";
// const url = "http://localhost:3000/students/attendance";
const url = "https://bf12-111-94-112-45.ap.ngrok.io/students/attendance"; // link dinamis, tolong disesuaikan sama ngrok di masing2 pc (pastikan ngrok tetap running)

export default function ScanAttendance({ navigation }) {
  const goToAttendance = () => {
    navigation.navigate("Attendance");
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [userLocation, setUserLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataQR, setDataQR] = useState("");
  const [text, setText] = useState("Not yet scanned");
  const [location, setLocation] = useState({});

  // useEffect(() => {
  //   GetCurrentLocation();
  // }, []);

  // Get current location
  async function GetCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords, `<< ini hasil get curr pos async`);
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // console.log(response, `<< ini response`);

      // Set location
      setLocation((prevState) => ({
        ...prevState,
        lon: longitude,
        lat: latitude,
      }));
      // console.log(location);

      for (let item of response) {
        const address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.district}, ${item.city}, ${item.subregion}, ${item.region}, ${item.country}  Lat: ${latitude}, Long: ${longitude}, `;

        setUserLocation(address);
        // console.log(address);
      }
    }
  }

  let textLocation = "Waiting..";
  if (errorMsg) {
    textLocation = errorMsg;
  } else if (userLocation) {
    textLocation = JSON.stringify(userLocation);
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
    // setScanned(true);
    // setText(data);
    // setDataQR(data);
    // console.log(dataQR, "<< dataqr dari scan qr bosq");
    // console.log(text, "<< text dari scan qr bosq");
    console.log(`Type: ${type}, Data: ${data}`);

    setScanned(true);
    setText(data);
    postAttendance(data);
    // async () => {
    //   try {
    //     console.log("masuk sini");
    //     const result = await axios({
    //       method: "POST",
    //       url: data,
    //       headers: {
    //         access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY1MDQxNTgxfQ.EBBxR9xSqva3WIi4Pwcoh3OTAcNn32umYm-SNJ0vwKs`,
    //       },
    //       data: {
    //         // date and time sudah di handle di server, nanti pindahin kesini
    //         // StudentId sudah dihandle di server
    //         dateAndTime: new Date(),
    //         lon: location.lon,
    //         lat: location.lat,
    //       },
    //     });
    //     console.log(result.data, "ini hasil");
    //   } catch (err) {
    //     console.log(err, "Error from post attendance");
    //   }
    // };
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
          access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY1MDQxNTgxfQ.EBBxR9xSqva3WIi4Pwcoh3OTAcNn32umYm-SNJ0vwKs`,
        },
        data: {
          // date and time sudah di handle di server, nanti pindahin kesini
          // StudentId sudah dihandle di server
          dateAndTime: new Date(),
          lon: location.lon,
          lat: location.lat,
        },
      });
      console.log(result.data, "ini hasil");
    } catch (err) {
      console.log(err, "Error from post attendance");
    }
  }

  return (
    <View style={styles.container}>
      <Button title={"Back"} onPress={goToAttendance} />
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ width: 550, height: 550 }}
        />
      </View>
      <Text style={styles.mainText}>{text}</Text>

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}

      {location && (
        <Text>
          My current location = lon: {location.lon} lat: {location.lat}
        </Text>
      )}

      {/* <Button
        title={"Tap to see Location"}
        onPress={() => {
          GetCurrentLocation();
          console.log(location);
        }}
      /> */}
      {/* <Button title={"new attendance"} onPress={() => postAttendance()} /> */}
      <Text>{textLocation}</Text>
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
});
