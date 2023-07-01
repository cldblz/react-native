import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { PROVIDER_GOOGLE } from "react-native-maps";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

export const CreatePostsScreen = () => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [location, setLocation] = useState(null);
  const [point, setPoint] = useState("");
  const [camera, setCamera] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [showMap, setShowMap] = useState("false");
  const [type, setType] = useState(Camera.Constants.Type.back);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      const coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      console.log(coordinates);
      setLocation(coordinates);
    })();
    setShowMap(false);
    setImage("");
    setPoint("");
    setText("");
    setLocation(null);
    setCamera(null);
  }, []);

  if (hasPermission === null) {
    return <Text>Give an access to camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onShowMap = () => {
    setShowMap(true);
  };
  const onRegionChange = (region) => {
    console.log(region);
  };
  const resetForm = (e) => {
    setImage(""), setText(""), setPoint("");
  };
  return (
    // <TouchableWithoutFeedback
    //   onPress={() => {
    //     Keyboard.dismiss();
    //     setShowMap(false);
    //   }}
    // >
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
        <View
          style={{
            ...styles.form_wrp,
            paddingBottom: showKeyboard && Platform.OS == "android" ? 32 : 270,
          }}
        >
          <View style={styles.photo_thumb}>
            <Camera
              style={styles.camera}
              type={type}
              ref={(ref) => setCameraRef(ref)}
            >
              {image && (
                <View style={styles.photo_view}>
                  <Image
                    source={{ uri: image }}
                    style={{ width: 367, height: 267, overflow: "hidden" }}
                  />
                </View>
              )}
              <TouchableOpacity
                // onPress={takePhoto}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    await MediaLibrary.createAssetAsync(uri);
                    console.log(uri);
                    setImage(uri);
                  }
                }}
              >
                <Image
                  style={styles.photo_icon}
                  source={require("../assets/images/photo.png")}
                ></Image>
              </TouchableOpacity>
              <View style={styles.arrow_wrp}>
                <TouchableOpacity
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <Image
                    style={styles.arrow_icon}
                    source={require("../assets/images/arrow.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
          <Text style={styles.camera_text}>Завантажте фото</Text>
          <View style={styles.post_container}>
            <TextInput
              // { text && () }
              style={styles.name_post_imput}
              placeholder="Назва..."
              value={text ? text : null}
              onChangeText={(text) => setText(text)}
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
                value={point ? point : null}
                onChangeText={(text) => setPoint(text)}
                placeholder="Місцевість..."
              ></TextInput>
            </View>
          </View>

          {showMap && (
            <TouchableOpacity onPress={() => setShowMap(false)}>
              <View style={styles.containerMap}>
                <MapView
                  style={styles.mapStyle}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={{
                    latitude: 50.39294500191538,
                    longitude: 30.606561675667763,
                    latitudeDelta: 0.007304944122623169,
                    longitudeDelta: 0.01574993133545277,
                  }}
                  region={{
                    ...location,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  showsUserLocation={true}
                  mapType="standard"
                  minZoomLevel={15}
                  onMapReady={() => {
                    Alert.alert(
                      "Tap anywhere over the borders of map to close it"
                    );
                    setPoint("Kiev, Ukraine");
                  }}
                  onRegionChange={onRegionChange}
                >
                  {/* {showLocationsOfInterest()} */}
                  <Marker
                    draggable
                    title={"I am here"}
                    coordinate={location}
                    description="Hello"
                  />
                </MapView>
              </View>
            </TouchableOpacity>
          )}

          {!showMap && (
            <TouchableOpacity
              onPress={() => {
                navigation.push("Home", {
                  screen: "Posts",
                  params: {
                    postText: text,
                    postImage: image,
                    postPoint: point,
                  },
                });
                resetForm();
              }}
              style={
                image || (image && text) || (image && location)
                  ? styles.button
                  : {
                      marginTop: 43,
                      backgroundColor: "#F6F6F6",
                      paddingTop: 16,
                      paddingBottom: 16,
                      borderRadius: 100,
                      cursor: "pointer",
                    }
              }
            >
              <Text
                style={
                  image || (image && text) || (image && location)
                    ? styles.button_title
                    : {
                        textAlign: "center",
                        fontSize: 16,
                        color: "#BDBDBD",
                      }
                }
              >
                Опубліковати
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.btn_wrp}>
          <TouchableOpacity onPress={resetForm} style={styles.button_delete}>
            <Ionicons name={"md-trash-outline"} size={24} color={"#BDBDBD"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "relative",
    // justifyContent: "space-between",
    // alignItems: "center",
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
    backgroundColor: "#FF6C00",
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
    cursor: "pointer",
  },
  button_title: {
    textAlign: "center",
    fontSize: 16,

    color: "#fff",
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
  arrow_icon: {
    width: 25,
    height: 20,
  },
  arrow_wrp: {
    top: 70,
    left: 135,
  },
  photo_view: {
    position: "absolute",
    width: 367,
    height: 267,

    borderColor: "#ffffff",
    borderWidth: 1,
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  containerMap: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    position: "absolute",
    zIndex: 2,
    width: 367,
    height: 267,
  },
});
