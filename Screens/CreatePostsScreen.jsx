import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

export const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.form_wrp}>
        <View style={styles.photo_thumb}>
          <Camera style={styles.camera}>
            <TouchableOpacity>
              <Image
                style={styles.photo_icon}
                source={require("../assets/images/photo.png")}
              ></Image>
            </TouchableOpacity>
          </Camera>
        </View>
        <Text style={styles.camera_text}>Завантажте фото</Text>
        <View style={styles.post_container}>
          <TextInput
            style={styles.name_post_imput}
            placeholder="Назва..."
          ></TextInput>
          <View style={styles.map_wrp}>
            <Ionicons
              name={"location-outline"}
              size={24}
              color="#BDBDBD"
              style={styles.map_svg}
            />
            <TextInput
              style={styles.map_post_imput}
              placeholder="Місцевість..."
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button_title}>Опубліковати</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btn_wrp}>
        <TouchableOpacity style={styles.button_delete}>
          <Ionicons name={"md-trash-outline"} size={24} color={"#BDBDBD"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
    paddingLeft: 22,
    paddingTop: 32,
    paddingBottom: 22,
    backgroundColor: "#ffffff",
  },
  form_wrp: {
    width: "100%",
  },
  photo_thumb: {
    width: 367,
    height: 267,
    backgroundColor: "#E8E8E8",
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: 367,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
  photo_icon: {
    width: 60,
    height: 60,
  },
  camera_text: {
    fontFamily: "RobotoRegular",
    color: "#BDBDBD",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "left",
    marginBottom: 32,
  },
  post_container: {
    width: 367,
  },
  name_post_imput: {
    width: 343,
    height: 50,
    alignContent: "center",
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  map_post_imput: {
    width: 343,
    height: 50,
    // alignContent: "center",
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    paddingLeft: 24,
  },
  map_wrp: {
    position: "relative",
  },
  map_svg: {
    position: "absolute",
    bottom: 15,
  },
  button: {
    marginTop: 43,
    backgroundColor: "#F6F6F6",
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
    cursor: "pointer",
  },
  button_title: {
    textAlign: "center",
    fontSize: 16,
    color: "#BDBDBD",
  },
  button_delete: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#f6f6f6",
    margin: 0,
  },
  btn_wrp: {
    alignItems: "center",
    position: "sticky",
  },
});
