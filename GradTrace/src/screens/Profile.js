import { View, StyleSheet, Text } from "react-native";
import { Avatar, Button } from "@rneui/themed";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.topContent}>
      <View style={styles.topContentContainer}>
        <Avatar
          size={90}
          rounded
          title="Profile Picture"
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          }}
        />
        <View style={styles.studentData}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.class}>Class 9</Text>
          <Text style={styles.email}>johndoe@mail.com</Text>
        </View>
      </View>
      <View style={styles.bottomContent}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topContentContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  studentData: {
    justifyContent: "center",
  },
  name: {
    fontSize: 22,
    marginStart: 20,
    fontWeight: "bold",
  },
  class: {
    fontSize: 18,
    marginStart: 20,
  },
  email: {
    fontSize: 14,
    marginStart: 20,
  },
  bottomContent: {
    flex: 10,
    backgroundColor: "lightgrey",
    width: "100%",
  },
});
