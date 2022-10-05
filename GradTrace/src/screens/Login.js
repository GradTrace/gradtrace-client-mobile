import { View, StyleSheet, Text, TextInput } from "react-native";
import { Button } from "@rneui/themed";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [textEmail, setTextEmail] = useState("");
  const [textPassword, setTextPassword] = useState("");



  const goToHome = () => {
    navigation.navigate("AppNavigator");
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTextEmail}
        value={textEmail}
        placeholder="Enter Email..."
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextPassword}
        value={textPassword}
        secureTextEntry={true}
        placeholder="Enter Password..."
      />

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

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

});
