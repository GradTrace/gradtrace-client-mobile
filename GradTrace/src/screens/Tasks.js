import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import TaskCard from "../components/TaskCard";
import { url } from "../../constants/url";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TasksScreen({ navigation, route }) {
  const [accessToken, setAccessToken] = useState("");
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
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
      setSearch("");
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
      setFilteredTasks(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Check if searched text is not blank
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = tasks.filter(function (item) {
        const itemData = item.Course.name
          ? item.Course.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredTasks(newData);
      setSearch(text);
    } else {
      // If text input is empty
      setFilteredTasks(tasks);
      setSearch(text);
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3905/3905267.png",
          }}
          style={{ width: 38, height: 38, marginTop: 12, marginEnd: 6 }}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          placeholder="Search by course..."
        />
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={card}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          width: "100%",
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
  input: {
    height: 50,
    width: 270,
    marginTop: 10,
    borderWidth: 0.75,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    // backgroundColor: "rgba(243,243,245,1)",
    backgroundColor: "white",
    borderColor: "darkgrey",
  },
});
