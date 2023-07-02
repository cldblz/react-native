import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import { PostsScreen } from "../PostsScreen";
import { ProfileScreen } from "../ProfileScreen";
import { CreatePostsScreen } from "../CreatePostsScreen";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperation";

const Tabs = createBottomTabNavigator();

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logOut = () => {
    dispatch(authSignOutUser());
    navigation.navigate("Login");
  };
  return (
    <Tabs.Navigator
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => {
          if (
            // route.name === "Коментарі" ||
            route.name === "Створити публікацію" ||
            route.name === "Профіль"
          ) {
            return (
              <Ionicons
                name="arrow-back"
                size={24}
                color="#212121"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              />
            );
          }
        },
        headerRight: () => {
          if (route.name === "Публікації") {
            return (
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 21 }}
                onPress={() => {
                  logOut();
                }}
              />
            );
          } else {
            return null;
          }
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Публікації") {
            iconName = "grid-outline";
          } else if (route.name === "Створити публікацію") {
            iconName = "ios-add-sharp";
          } else if (route.name === "Профіль") {
            iconName = "person-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={route.name === "Створити публікацію" ? "#ffffff" : color}
              style={
                route.name === "Створити публікацію"
                  ? styles.menu_icon_active
                  : ""
              }
            />
          );
        },
        tabBarActiveTintColor: "#ff6c00",
        tabBarInactiveTintColor: "#212121",
        tabBarShowLabel: false,
        // tabBarContentContainerStyle: {
        //   flexDirection: "row",
        //   justifyContent: "space-around",
        //   alignItems: "center",
        //   width: 70,
        //},
        // tabBarActiveBackgroundColor: "#ff6c00",
        // tabBarItemStyle: {
        //   height: 40,
        //   borderRadius: 20,
        // },
      })}
    >
      <Tabs.Screen name="Публікації" component={PostsScreen} />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="Профіль"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menu_icon_active: {
    backgroundColor: "#ff6c00",
    width: 90,
    height: 40,
    textAlign: "center",
    marginTop: 8,
    paddingTop: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
});
