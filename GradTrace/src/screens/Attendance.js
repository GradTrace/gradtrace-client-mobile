import { View, StyleSheet, ScrollView } from "react-native";
import { Button } from "@rneui/themed";

import AttendanceCard from "../components/AttendanceCard";

export default function AttendanceScreen({ navigation }) {
  const goToAttendanceScan = () => {
    navigation.navigate("ScanAttendance");
  };

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
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={{
            width: "100%",
            paddingTop: 2,
            paddingBottom: 20,
            paddingHorizontal: 21,
          }}
        >
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
          <AttendanceCard />
        </ScrollView>
      </View>
    </>
  );
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
  scrollview: {
    backgroundColor: "lightgrey",
  },
});
