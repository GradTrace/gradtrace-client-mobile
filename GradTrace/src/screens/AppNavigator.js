import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./Home";
import TasksScreen from "./Tasks";
import AttendanceScreen from "./Attendance";
import ProfileScreen from "./Profile";

const Tab = createBottomTabNavigator();

export default function AppNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Tasks") {
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
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: () => (
            <Text
              style={styles.signOut}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
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
