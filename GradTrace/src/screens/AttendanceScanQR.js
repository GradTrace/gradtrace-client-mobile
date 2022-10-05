import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";

export default function ScanAttendance({ navigation }) {
  const goToAttendance = () => {
    navigation.navigate("Attendance");
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request for camera permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log(`Type: ${type}, Data: ${data}`);
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

  return (
    <View style={styles.container}>
      <Button
        title={"Back"}
        onPress={goToAttendance}
        style={styles.backButton}
      />
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
  backButton: {},
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
