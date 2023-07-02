import { Formik } from "formik";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import AddSvg from "../../assets/svg/AddSvg";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperation";
import { Camera, CameraType } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../../firebase/config";

const initialState = {
  login: "",
  mail: "",
  password: "",
  avatar: null,
};

export const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [displayText, setDisplaytext] = useState("Показати");
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setDisplaytext(showPassword ? "Показати" : "Приховати");
  }, [displayText, showPassword]);

  const handleTogglePassword = (event) => {
    setShowPassword(!showPassword);
  };
  const handleFormSubmit = () => {
    // console.log(values);
    // resetForm();
    // navigation.navigate("Home");
    // setIsShowKeyboard(false);
    dispatch(authSignUpUser(state));
    setState(initialState);
    const user = auth.currentUser;
    console.log("log from form", user);
    if (user) {
      navigation.navigate("Home");
    }
  };

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    const avatar = await camera.takePictureAsync();
    setState((prev) => ({ ...prev, avatar: avatar.uri }));
    console.log(avatar.uri);
  };

  const registration = () => {};

  return (
    <View style={styles.form_wrapper}>
      <Camera style={styles.camera} ref={setCamera} type={CameraType.front}>
        {state.avatar && (
          <>
            <View style={styles.takePhotoBox}>
              <Image source={{ uri: state.avatar }} style={styles.avatar} />
            </View>
          </>
        )}
      </Camera>
      {state.avatar && (
        <TouchableOpacity
          onPress={() => {
            setState((prev) => ({ ...prev, avatar: "" }));
          }}
          style={{
            position: "absolute",
            bottom: 510,
            right: 126,
            width: 24,
            height: 24,
            backgroundColor: "#fff",
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "#E8E8E8",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="close" size={20} color="#BDBDBD" />
        </TouchableOpacity>
      )}
      {!state.avatar && (
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 510,
            right: 124,
          }}
          onPress={takePhoto}
        >
          <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
        </TouchableOpacity>
      )}
      {/* <View style={styles.avatar_wrapper}>
        <View style={styles.avatar}></View>
        <AddSvg style={styles.add_svg}></AddSvg>
      </View> */}
      <Text style={styles.title}>Реєстрація</Text>
      <Formik initialValues={initialState} onSubmit={handleFormSubmit}>
        {({ handleChange, handleSubmit, values }) => (
          <View style={styles.form}>
            <TextInput
              style={[
                styles.input,
                focusName ? styles.inputOnFocus : styles.inputOnBlur,
              ]}
              onFocus={() => setFocusName(true)}
              onBlur={() => setFocusName(false)}
              placeholder="Логін"
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, login: value }))
              }
              // value={state.login}
            ></TextInput>
            <TextInput
              style={[
                styles.input,
                focusEmail ? styles.inputOnFocus : styles.inputOnBlur,
              ]}
              onFocus={() => setFocusEmail(true)}
              onBlur={() => setFocusEmail(false)}
              placeholder="Адреса електронної пошти"
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, mail: value }))
              }
              // value={state.mail}
            ></TextInput>
            <View style={styles.password_wrp}>
              <TextInput
                name="password"
                style={[
                  styles.input,
                  focusPassword ? styles.inputOnFocus : styles.inputOnBlur,
                ]}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setFocusPassword(false)}
                placeholder="Пароль"
                secureTextEntry={showPassword}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                // value={state.password}
              ></TextInput>
              <TouchableOpacity
                style={styles.password_show}
                onPress={handleTogglePassword}
              >
                <Text style={styles.display_text}>{displayText}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button_registration}
              onPress={handleSubmit}
            >
              <Text style={styles.button_title}> Зареєстуватися</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <Text style={styles.login_text}>
        Вже є акаунт?
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.enter_text}> {""}Увійти</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    position: "absolute",
    overflow: "hidden",
    top: -60,
    left: "35%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  takePhotoBox: {
    position: "absolute",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  input: {
    padding: 16,
    borderRadius: 8,
    borderColor: "#e8e8e8",
    height: 50,
    borderWidth: 1,
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
  },
  button_registration: {
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
  password_wrp: {
    position: "relative",
  },
  password_show: {
    position: "absolute",
    right: 60,
    transform: [{ translateX: 50 }, { translateY: 17 }],
  },
  inputOnFocus: { borderColor: "#FF6C00" },
  inputOnBlur: { borderColor: "#e8e8e8" },
  display_text: {
    color: "#1B4371",
    fontSize: 16,
  },
  form_wrapper: {
    alignItems: "center",
    width: "100%",
    height: "65%",

    backgroundColor: "#fff",
    borderRadius: 25,
  },

  avatar_wrapper: {
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    marginTop: -60,
    marginBottom: 32,
  },
  add_svg: {
    position: "absolute",
    top: "10%",

    transform: [{ translateX: 108 }, { translateY: 10 }],
  },
  title: {
    color: "#212121",
    marginBottom: 32,
    // fontFamily: "Roboto",
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
