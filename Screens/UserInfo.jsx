import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase/config";

export const UserInfo = () => {
  const user = auth.currentUser;

  return (
    <View style={styles.user_container}>
      <View style={styles.user_info_wrp}>
        {/* TODO show photo */}
        <Image source={user.photoURL} style={styles.user_img} />
        <View style={styles.user_data}>
          <Text style={styles.user_name}>{user.displayName}</Text>
          <Text style={styles.user_email}>{user.email}</Text>
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
    // flex: 1,
    // paddingLeft: 8,
    // paddingTop: 12,
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
