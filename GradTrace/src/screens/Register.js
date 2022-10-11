import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Button } from "@rneui/themed";
import { useState } from "react";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/url";

import logo from "../../assets/GradTrace-logo.png";

export default function RegisterScreen({ navigation }) {
  const [textFullName, setTextFullName] = useState("");
  const [textClassName, setTextClassName] = useState("");
  const [textEmail, setTextEmail] = useState("");
  const [textPassword, setTextPassword] = useState("");
  const [textPhoto, setTextPhoto] = useState("");
  const [textAddress, setTextAddress] = useState("");
  const [textPhoneNumber, setTextPhoneNumber] = useState("");
  const [textGender, setTextGender] = useState("");

  // Navigate to login screen
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  // Register handler
  const registerHandler = async () => {
    try {
      const result = await axios({
        method: "POST",
        url: `${url}/students/register`,
        data: {
          fullName: textFullName,
          className: textClassName,
          email: textEmail,
          password: textPassword,
          photo: textPhoto,
          address: textAddress,
          phoneNumber: textPhoneNumber,
          gender: textGender,
        },
      });
      storeData(result.data);
      setTextFullName("");
      setTextClassName("");
      setTextEmail("");
      setTextPassword("");
      setTextPhoto("");
      setTextAddress("");
      setTextPhoneNumber("");
      setTextGender("");
      navigation.navigate("AppNavigator");
    } catch (err) {
      Alert.alert("Register error", err.response.data.message);
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
      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        New Account
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Full name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTextFullName}
          value={textFullName}
          placeholder="John Doe"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Class</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTextClassName}
          value={textClassName}
          placeholder="7 or 8 or 9"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTextEmail}
          value={textEmail}
          placeholder="example@mail.com"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Pasword</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTextPassword}
          value={textPassword}
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Photo URL</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTextPhoto}
          value={textPhoto}
          placeholder="Photo URL"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTextAddress}
          value={textAddress}
          placeholder="Jl. Pegangsaan Raya no. 17"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Phone number</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTextPhoneNumber}
          value={textPhoneNumber}
          placeholder="081234567"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Gender</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTextGender}
          value={textGender}
          placeholder="Male or Female"
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <Button
          title="Back"
          onPress={goToLogin}
          titleStyle={{ fontSize: 18 }}
          buttonStyle={{
            backgroundColor: "black",
            borderRadius: 10,
          }}
          containerStyle={{
            width: 90,
            marginHorizontal: 5,
            marginVertical: 10,
          }}
        />
        <Button
          title="Sign Up"
          onPress={registerHandler}
          titleStyle={{ fontSize: 18 }}
          buttonStyle={{
            backgroundColor: "black",
            borderRadius: 10,
          }}
          containerStyle={{
            width: 90,
            marginHorizontal: 5,
            marginVertical: 10,
          }}
        />
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
    height: 40,
    width: 250,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  logo: {
    width: 320,
    height: 70,
    marginBottom: 15,
  },
  title: {
    marginStart: 15,
  },
  inputContainer: {
    justifyContent: "flex-start",
  },
});
