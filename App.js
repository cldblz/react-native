import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { RegistrationScreen } from "./Screens/Registration/RegistrationScreen";
import { LoginScreen } from "./Screens/Login/LoginScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });
  return (
    <View style={styles.containerr}>
      <RegistrationScreen></RegistrationScreen>
      {/* <LoginScreen></LoginScreen> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  containerr: {
    flex: 1,
  },
});
