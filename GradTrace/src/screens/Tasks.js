import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";

export default function TasksScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Tasks</Text>
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
