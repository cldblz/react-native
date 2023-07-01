import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

export const UserInfo = () => {
  return (
    <View style={styles.user_container}>
      <View style={styles.user_info_wrp}>
        <Image
          source={require("../assets/images/user.png")}
          style={styles.user_img}
        />
        <View style={styles.user_data}>
          <Text style={styles.user_name}>Natali Romanova</Text>
          <Text style={styles.user_email}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  user_container: {
    flex: 1,
  },
  user_info_wrp: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  user_img: {
    width: 60,
    height: 60,
    overflow: "hidden",
    borderRadius: 16,
  },
  user_data: {
    flexDirection: "column",
    justifyContent: "center",
  },
  user_name: {
    color: "#212121",
    fontFamily: "RobotoBold",
    fontSize: 13,
    lineHeight: 16,
  },
  user_email: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
