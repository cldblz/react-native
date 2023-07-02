import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { UserInfo } from "./UserInfo";
import { getPostsFromFirestore } from "../redux/posts/postsOperations";

export const PostsScreen = async () => {
  const navigation = useNavigation();
  const posts = await getPostsFromFirestore();

  return (
    <View style={styles.container}>
      <UserInfo />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    // alignItems: "center",
    paddingRight: 16,
    paddingLeft: 22,
    paddingTop: 32,
    paddingBottom: 22,
    backgroundColor: "#ffffff",
  },
});
