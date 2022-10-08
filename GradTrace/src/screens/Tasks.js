import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import { useState, useEffect } from "react";

import TaskCard from "../components/TaskCard";

import { url } from "../../constants/url";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TasksScreen({ navigation }) {
  const [accessToken, setAccessToken] = useState("");
  const [tasks, setTasks] = useState({});

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");

      if (jsonValue) {
        const result = JSON.parse(jsonValue);
        setAccessToken(result.access_token);
        getTasks(result.access_token);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Get tasks data
  const getTasks = async (access_token) => {
    try {
      const result = await axios({
        method: "GET",
        url: `${url}/students/tasks`,
        headers: {
          access_token,
        },
      });

      setTasks(result.data);
      console.log(result.data, "<< hasil axios");
    } catch (err) {
      console.log(err);
    }
  };

  const card = ({ item }) => <TaskCard item={item} />;
  console.log(tasks, "<< ini tasks");
  return (
    <View style={styles.container}>
      {/* <ScrollView
        style={styles.scrollview}
        contentContainerStyle={{
          width: "100%",
          paddingTop: 2,
          paddingBottom: 20,
          paddingHorizontal: 19,
        }}
      > */}
      {/* <TaskCard /> */}
      <FlatList
        data={tasks}
        renderItem={card}
        keyExtractor={(item) => item.id}
      />
      {/* </ScrollView> */}
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
  scrollview: {
    backgroundColor: "lightgrey",
  },
});
