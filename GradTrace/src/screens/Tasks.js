import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Chip } from "react-native-elements";

import TaskCard from "../components/TaskCard";

import { url } from "../../constants/url";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TasksScreen({ navigation, route }) {
  const [accessToken, setAccessToken] = useState("");
  const [tasks, setTasks] = useState([]);

  // const [search, setSearch] = useState("");
  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  // const [masterDataSource, setMasterDataSource] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // course
  const courses = [
    { id: 1, name: "Biology" },
    { id: 2, name: "Math" },
    { id: 3, name: "English" },
  ];

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
      // setFilteredDataSource(result.data);
      // setMasterDataSource(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Card to be rendered
  const card = ({ item }) => <TaskCard item={item} navigation={navigation} />;

  // Course filter
  const chip = ({ item }) => <Chip title={item.name} />;

  // const filterFunction = (text) => {
  //   if (text) {
  //     console.log(text, "masukk");
  //     // const newData = masterDataSource.filter(function (item) {
  //     //   const itemData = item.title
  //     //     ? item.title.toUpperCase()
  //     //     : "".toUpperCase();
  //     //   const textData = text.toUpperCase();
  //     //   return itemData.indexOf(textData) > -1;
  //     // });
  //   } else {
  //     // setFilteredDataSource(masterDataSource);
  //     // setSearch(text);
  //   }
  // };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={chip}
        horizontal={true}
      />

      <FlatList
        data={tasks}
        renderItem={card}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          width: "100%",
          paddingTop: 2,
          paddingBottom: 20,
          paddingHorizontal: 19,
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
