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

// TODO remove
import { Feather } from "@expo/vector-icons";

import { useFonts } from "expo-font";
import { LoginForm } from "./LoginForm";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperation";

export const LoginScreen = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
  });
  const navigation = useNavigation();

  // TODO remove
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerkb}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/images/bgimg.png")}
            style={styles.bg_wrp}
          >
            <View style={styles.form_wrapper}>
              {/* TODO remove */}
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 21 }}
                onPress={() => {
                  logOut();
                }}
              />
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 21 }}
                onPress={() => {
                  navigation.navigate("Home");
                }}
              />
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
      </TouchableWithoutFeedback>
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
