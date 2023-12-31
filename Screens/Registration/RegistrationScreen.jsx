import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { RegistrationForm } from "./RegistrationForm";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

export const RegistrationScreen = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
          ></ImageBackground>
          <RegistrationForm />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  containerkb: {
    flex: 1,
  },
  // form_wrapper: {
  //   alignItems: "center",
  //   width: "100%",
  //   height: "65%",

  //   backgroundColor: "#fff",
  //   borderRadius: 25,
  // },

  // avatar_wrapper: {
  //   position: "relative",
  // },
  // avatar: {
  //   width: 120,
  //   height: 120,
  //   backgroundColor: "#f6f6f6",
  //   borderRadius: 16,
  //   marginTop: -60,
  //   marginBottom: 32,
  // },
  // add_svg: {
  //   position: "absolute",
  //   top: "10%",

  //   transform: [{ translateX: 108 }, { translateY: 10 }],
  // },
  // title: {
  //   color: "#212121",
  //   marginBottom: 32,
  //   // fontFamily: "Roboto",
  //   fontWeight: "500",
  //   fontSize: 30,
  //   lineHeight: 35,
  // },
  // login_text: {
  //   color: "#1B4371",
  // },
  // enter_text: {
  //   top: 2,
  //   textAlign: "center",
  //   color: "#1B4371",
  //   textDecorationLine: "underline",
  // },
});
