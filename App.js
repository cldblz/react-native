import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { RegistrationScreen } from "./Screens/Registration/RegistrationScreen";
import { LoginScreen } from "./Screens/Login/LoginScreen";
import { HomeScreen } from "./Screens/Home/HomeScreen";
import { Button } from "react-native-web";
const MainStack = createStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen name="Registration" component={RegistrationScreen} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home screen",
          }}
        />
      </MainStack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  containerr: {
    flex: 1,
  },
});
