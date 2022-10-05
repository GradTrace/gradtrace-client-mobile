import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
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
