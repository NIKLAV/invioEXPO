import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import CustomButton from "../common/Button/CustomButton";
import Footer from "../common/Footer/Footer";
import CustomModal from "../common/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import validateLogin from "../../utilts/validateLogin";
import useForm from "../../hooks/useForm";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import { Context as AuthContext } from "../../context/AuthContext";
import { windowHeight } from "../../utilts/windowHeight";

const Login = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  const [showModal, setSwhoModal] = useState(false);

  const {
    handleSubmit,
    login,
    setLogin,
    password,
    setPassword,
    errors,
    setErrors,
    isSuccessfullSubmiting,
    disableButton,
    totp,
    setTotp,
  } = useForm(null, validateLogin);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (state.token) {
    navigation.navigate("Wallets");
  }

  const [isHidden, setIsHidden] = useState(true)

  const checkForHidden = () => {
    setIsHidden(!isHidden)
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset="-320"
      >
        {/* чтобы клавиатура не закрывала инпут отрицательное значение */}
        <View style={{ height: windowHeight }}>
          <ImageBackground
            source={require("../../assets/images/login/back.png")}
            style={styles.container}
            resizeMode="cover"
          >
            <View style={styles.logo}>
              <Image
                source={require("../../assets/images/login/logo_header.png")}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={styles.logo__text}>
                Send money anywhere, for free
              </Text>
            </View>
            {/*  {state.errorMessage ? <Text>{state.errorMessage}</Text> : null} */}

            {state.errorMessage ? (
              <CustomModal
                clearErrorMessage={clearErrorMessage}
                errors={state.errorMessage}
              />
            ) : null}

            <View style={styles.inputs}>
              <View style={styles.input}>
                {errors && (
                  <Text style={styles.input__error}>{errors.login}</Text>
                )}
                <TextInput
                  placeholderTextColor="#38383b"
                  placeholder="  Login"
                  style={styles.input__body}
                  value={login}
                  onChangeText={(login) => {
                    setLogin(login);
                    setErrors(validateLogin(login, password, totp));
                  }}
                />
              </View>
              <View style={styles.input}>
                {errors && (
                  <Text style={styles.input__error}> {errors.password}</Text>
                )}
                <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    placeholderTextColor="#38383b"
                    placeholder="  Password"
                    style={[styles.input__body, { width: 250 }]}
                    textContentType="password"
                    secureTextEntry={isHidden}
                    value={password}
                    onChangeText={(password) => {
                      setPassword(password);
                      setErrors(validateLogin(login, password, totp));
                    }}
                  />
                  <TouchableOpacity onPress={checkForHidden}>
                    <Image source={require('../../assets/history.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.input}>
                {errors && (
                  <Text style={styles.input__error}> {errors.totp}</Text>
                )}
                <TextInput
                  placeholderTextColor="#38383b"
                  placeholder="  TOTP"
                  style={styles.input__body}
                  value={totp}
                  onChangeText={(totp) => {
                    setTotp(totp);
                    setErrors(validateLogin(login, password, totp));
                  }}
                />
              </View>
            </View>
            <View style={styles.button__container}>
              <CustomButton
                disabled={disableButton}
                onPress={() => {
                  setErrors(validateLogin(login, password, totp));

                  signin({ login, password, totp });
                }}
              >
                Login
              </CustomButton>
            </View>
            <Footer />
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* minHeight: windowHeight, */
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    marginTop: 50,
    display: "flex",
    /* justifyContent: "center", */
    /* alignItems: "center", */
  },
  logo__text: {
    fontSize: 15,
    color: "white",
  },
  inputs: {
    /* alignItems: "center", */
  },
  input: {
    marginTop: 30,
  },
  input__error: {
    color: "red",
    fontWeight: "bold",
  },
  input__body: {
    width: 280,
    height: 44,
    borderRadius: 10,
    backgroundColor: "white",
  },
  button__container: {
    /* marginTop: 35, */
    /* marginBottom: 100, */
  },
});

export default Login;
