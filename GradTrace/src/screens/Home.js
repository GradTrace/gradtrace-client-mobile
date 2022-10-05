import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";

export default function HomeScreen({ navigation }) {
  // const goToTasks = () => {
  //   navigation.navigate("Tasks");
  // };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
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
