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

  // Navigate to register screen
  const goToRegister = () => {
    navigation.navigate("Register");
  };

  // Login handler
  const loginHandler = async () => {
    try {
      const result = await axios({
        method: "POST",
        url: `${url}/students/login`,
        data: {
          email: textEmail,
          password: textPassword,
        },
      });
      storeData(result.data);
      setTextEmail("");
      setTextPassword("");
      navigation.navigate("AppNavigator");
    } catch (err) {
      Alert.alert("Sign in error", err.response.data.message);
    }
  };

  // Store access_token as object
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (err) {
      Alert.alert("Error", err);
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TextInput
        style={styles.input}
        onChangeText={setTextEmail}
        value={textEmail}
        placeholder="Enter your email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextPassword}
        value={textPassword}
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      <Button
        title="Sign In"
        titleStyle={{ fontSize: 18 }}
        onPress={loginHandler}
        buttonStyle={{
          backgroundColor: "black",
          borderRadius: 10,
        }}
        containerStyle={{
          width: 90,
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      />
      <View style={{ marginTop: 10, alignItems: "center" }}>
        <Text style={{ fontSize: 16 }}>Don't have an account yet?</Text>
        <Text
          onPress={goToRegister}
          style={{
            fontSize: 16,
            marginTop: 5,
            color: "darkblue",
            textDecorationLine: "underline",
          }}
        >
          Register here
        </Text>
      </View>
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
    height: 50,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  logo: {
    width: 340,
    height: 90,
    marginBottom: 15,
  },
});
