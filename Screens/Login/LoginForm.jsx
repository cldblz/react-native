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

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [displayText, setDisplaytext] = useState("Показати");
  useEffect(() => {
    setDisplaytext(showPassword ? "Показати" : "Приховати");
  }, [displayText, showPassword]);

  const handleTogglePassword = (event) => {
    setShowPassword(!showPassword);
  };
  return (
    <Formik>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Адреса електронної пошти"
        ></TextInput>
        <View style={styles.password_wrp}>
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry={showPassword}
            //   onChangeText={handleChange("password")}
            //   value={values.password}
          ></TextInput>
          <TouchableOpacity
            style={styles.password_show}
            onPress={handleTogglePassword}
          >
            <Text>{displayText}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button_title}>Увійти</Text>
        </TouchableOpacity>
      </View>
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
});
