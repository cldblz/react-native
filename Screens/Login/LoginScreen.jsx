import React from "react";
import {
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

import { useFonts } from "expo-font";
import { LoginForm } from "./LoginForm";

export const LoginScreen = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bgimg.png")}
        style={styles.bg_wrp}
      >
        <View style={styles.form_wrapper}>
          <Text style={styles.title}>Увійти</Text>
          <LoginForm />
          <Text>
            Немає акаунту?
            {/* <LoginRediraction onPress={() => navigation.navigate("Login")}> */}
            <Text>Зареєструватися</Text>
            {/* </LoginRediraction> */}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: " 100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bg_wrp: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  form_wrapper: {
    alignItems: "center",
    width: "100%",
    height: "65%",

    backgroundColor: "#fff",
    borderRadius: 25,
  },
  title: {
    color: "#212121",
    marginTop: 32,
    marginBottom: 32,
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
  },
});
