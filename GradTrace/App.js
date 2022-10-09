import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppNavigator from "./src/screens/AppNavigator";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import ScanAttendance from "./src/screens/AttendanceScanQR";
import UploadTaskPage from "./src/screens/UploadTaskPage";

const Stack = createNativeStackNavigator();

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
          name="Upload"
          component={UploadTaskPage}
          // options={{ headerShown: false }}
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
