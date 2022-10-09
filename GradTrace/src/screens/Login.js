import { View, StyleSheet, Text, TextInput, Alert, Image } from "react-native";
import { Button } from "@rneui/themed";
import { useState } from "react";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/url";

import logo from "../../assets/GradTrace-logo.png";

export default function LoginScreen({ navigation }) {
  const [textEmail, setTextEmail] = useState("");
  const [textPassword, setTextPassword] = useState("");

  const loginHandler = async () => {
    try {
      // console.log(textEmail, "<<< input email");
      // console.log(textPassword, "<<< input password");

      const result = await axios({
        method: "POST",
        url: `${url}/students/login`,
        data: {
          email: textEmail,
          password: textPassword,
        },
      });
      // console.log(result.data, "<<< hasil login axios");
      storeData(result.data);
      setTextEmail("");
      setTextPassword("");

      navigation.navigate("AppNavigator");
    } catch (err) {
      Alert.alert("Error", err.response.data.message);
    }
  };

  // Navigate to register screen
  const goToRegister = () => {
    navigation.navigate("Register");
  };

  // Store access_token as object
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
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

      <Button title="Sign In" type="outline" onPress={loginHandler} />
      <Button title="Register" type="outline" onPress={goToRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  logo: {
    width: 340,
    height: 90,
    marginBottom: 15,
  },
});
