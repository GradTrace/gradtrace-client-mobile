import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";

export default function LoginScreen({ navigation }) {
  const goToHome = () => {
    navigation.navigate("AppNavigator");
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign In" type="outline" onPress={goToHome} />
      <Button title="Register" type="outline" onPress={goToRegister} />
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
