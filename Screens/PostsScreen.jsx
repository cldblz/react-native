import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { UserInfo } from "./UserInfo";

export const PostsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <UserInfo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 22,
    paddingTop: 32,
    paddingBottom: 22,
    backgroundColor: "#ffffff",
  },
});
