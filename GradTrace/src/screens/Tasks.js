import { View, StyleSheet, ScrollView, Text } from "react-native";

import TaskCard from "../components/TaskCard";

export default function TasksScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={{
          width: "100%",
          paddingTop: 2,
          paddingBottom: 20,
          paddingHorizontal: 19,
        }}
      >
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </ScrollView>
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
