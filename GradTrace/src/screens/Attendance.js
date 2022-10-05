import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";

export default function AttendanceScreen({ navigation }) {
  const goToAttendanceScan = () => {
    navigation.navigate("ScanAttendance");
  };

  return (
    <View style={styles.container}>
      <Button title="Scan QR" onPress={goToAttendanceScan} />
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
});
