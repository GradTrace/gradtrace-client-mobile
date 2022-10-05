import { View, StyleSheet, Text, TextInput } from "react-native";
import { Button } from "@rneui/themed";
import { useState } from "react";

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
      <Text>Register</Text>

      <TextInput
        style={styles.input}
        onChangeText={setTextFullName}
        value={textFullName}
        placeholder="Enter Full Name..."
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextClassName}
        value={textClassName}
        placeholder="Enter Class Name..."
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextAddress}
        value={textAddress}
        placeholder="Enter Address..."
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextPhoneNumber}
        value={textPhoneNumber}
        placeholder="Enter Phone Number..."
      />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

});
