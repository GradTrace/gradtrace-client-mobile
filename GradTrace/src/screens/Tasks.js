import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import TaskCard from "../components/TaskCard";

import { url } from "../../constants/url";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TasksScreen({ navigation, route }) {
  const [accessToken, setAccessToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get access token and get tasks
  const getData = async () => {
    try {
      setIsLoading(true);
      const jsonValue = await AsyncStorage.getItem("@storage_Key");

      if (jsonValue) {
        const result = JSON.parse(jsonValue);
        setAccessToken(result.access_token);
        getTasks(result.access_token);
        setIsLoading(false);
      } else {
        console.log("error");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  // Get tasks function
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
    } catch (err) {
      console.log(err);
    }
  };

  // Card to be rendered
  const card = ({ item }) => <TaskCard item={item} navigation={navigation} />;

  // Loading screen
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "lightblue",
        }}
      >
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={card}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          width: "100%",
          paddingTop: 2,
          paddingBottom: 15,
        }}
        style={styles.scrollview}
      />
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
  scrollview: {
    backgroundColor: "lightblue",
  },
});
