import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperation";

import { auth } from "../../firebase/config";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [displayText, setDisplaytext] = useState("Показати");
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [state, setState] = useState(initialState);
  useEffect(() => {
    setDisplaytext(showPassword ? "Показати" : "Приховати");
  }, [displayText, showPassword]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleTogglePassword = (event) => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (values, { resetForm }) => {
    // console.log(values);
    // navigation.navigate("Home");
    dispatch(authSignInUser(state));
    setState(initialState);
    const user = auth.currentUser;
    console.log("login form", user);
    if (user) {
      navigation.navigate("Home");
    }
    // resetForm();
  };
  const initialState = {
    email: "",
    password: "",
  };
  return (
    <Formik initialValues={initialState} onSubmit={handleFormSubmit}>
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.form}>
          <TextInput
            style={[
              styles.input,
              focusEmail ? styles.inputOnFocus : styles.inputOnBlur,
            ]}
            onFocus={() => setFocusEmail(true)}
            onBlur={() => setFocusEmail(false)}
            placeholder="Адреса електронної пошти"
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, email: value }))
            }
            // value={state.email}
          ></TextInput>
          <View style={styles.password_wrp}>
            <TextInput
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
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.button_title}>Увійти</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
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
});
