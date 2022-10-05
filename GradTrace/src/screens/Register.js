import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";

export default function RegisterScreen({ navigation }) {
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Button title="Sign Up" type="outline" onPress={goToLogin} />
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
