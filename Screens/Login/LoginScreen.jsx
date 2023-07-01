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
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useFonts } from "expo-font";
import { LoginForm } from "./LoginForm";

export const LoginScreen = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
  });
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerkb}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bgimg.png")}
          style={styles.bg_wrp}
        >
          <View style={styles.form_wrapper}>
            <Text style={styles.title}>Увійти</Text>
            <LoginForm />
            <Text style={styles.login_text}>
              Немає акаунту?
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.enter_text}> {""}Зареєструватися</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerkb: {
    flex: 1,
  },
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
  login_text: {
    color: "#1B4371",
  },
  enter_text: {
    top: 2,
    textAlign: "center",
    color: "#1B4371",
    textDecorationLine: "underline",
  },
});
