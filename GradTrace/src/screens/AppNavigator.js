import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, Alert } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";

import TasksScreen from "./Tasks";
import AttendanceScreen from "./Attendance";
import ProfileScreen from "./Profile";

const Tab = createBottomTabNavigator();

export default function AppNavigator({ navigation }) {
  // Sign out alert
  const signOutAlert = () => {
    Alert.alert("Sign out", "You can access your account by signing back in", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign out",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Tasks") {
            iconName = focused ? "file-tray-full" : "file-tray-full-outline";
          } else if (route.name === "Attendance") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <IonIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        headerTitleAlign: "center",
      })}
    >
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: () => (
            <Text style={styles.signOut} onPress={signOutAlert}>
              Sign Out
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  signOut: {
    marginRight: 15,
    fontSize: 18,
    color: "red",
  },
});
