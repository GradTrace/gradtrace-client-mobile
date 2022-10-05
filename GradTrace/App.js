import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import HomeScreen from "./src/screens/Home";
import TasksScreen from "./src/screens/Tasks";
import ProfileScreen from "./src/screens/Profile";
import AttendanceScreen from "./src/screens/Attendance";
import ScanAttendance from "./src/screens/AttendanceScanQR";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppNavigator({ navigation }) {
  return (
    <Tab.Navigator>
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScanAttendance"
          component={ScanAttendance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppNavigator"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
