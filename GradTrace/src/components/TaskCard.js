import { StyleSheet, View } from "react-native";
import { Text, Card, Avatar, Button } from "@rneui/themed";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export default function TaskCard({ item, navigation }) {
  const [StudentId, setStudentId] = useState("");

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");

      if (jsonValue) {
        const result = JSON.parse(jsonValue);
        setStudentId(result.StudentId);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  let url = "none";
  item.AssignmentGrades.map((el) => {
    if (el.StudentId === StudentId && el.AssignmentId === item.id) {
      url = el.url;
    }
    return url;
  });

  const goToUpload = () => {
    navigation.navigate("Upload", {
      id: item.id,
      url,
      StudentId,
    });
  };

  const now = new Date().getTime();

  return (
    <Card containerStyle={styles.cardContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 8,
          marginBottom: 12,
        }}
      >
        <Avatar
          size={60}
          source={{
            uri: item.Course.icon,
          }}
        />
        <View style={{ marginStart: 15 }}>
          <Text style={styles.subject}>{item.Course.name}</Text>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.deadline}>
            Deadline:{" "}
            <Text style={{ fontWeight: "normal" }}>
              {moment(item.deadline).format("ddd, Do MMM YYYY")}
            </Text>
          </Text>
        </View>
      </View>
      {now >= new Date(item.deadline).getTime() ? null : (
        <Button title={"Submit"} onPress={() => goToUpload()} />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
    marginBottom: 2,
    marginHorizontal: 25,
  },
  card: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    marginStart: 12,
  },
  subject: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  deadline: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
