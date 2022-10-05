import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";

export default function AttendanceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Attendance</Text>
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
