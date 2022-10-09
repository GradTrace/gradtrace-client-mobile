import { View, StyleSheet, Text, TextInput, Alert, Image } from "react-native";
import { Button } from "@rneui/themed";
import { useState } from "react";

import logo from "../../assets/GradTrace-logo.png";

export default function RegisterScreen({ navigation }) {
  const [textFullName, setTextFullName] = useState("");
  const [textClassName, setTextClassName] = useState("");
  const [textAddress, setTextAddress] = useState("");
  const [textPhoneNumber, setTextPhoneNumber] = useState("");
  const [textEmail, setTextEmail] = useState("");
  const [textPassword, setTextPassword] = useState("");

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <TextInput
        style={styles.input}
        onChangeText={setTextFullName}
        value={textFullName}
        placeholder="Full name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextClassName}
        value={textClassName}
        placeholder="Class"
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextAddress}
        value={textAddress}
        placeholder="Address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextPhoneNumber}
        value={textPhoneNumber}
        placeholder="Phone number"
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextEmail}
        value={textEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextPassword}
        value={textPassword}
        secureTextEntry={true}
        placeholder="Password"
      />
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
    margin: 8,
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
