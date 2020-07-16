import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import CustomButton from "../common/Button/CustomButton";
import Footer from "../common/Footer/Footer";
import Header from "../common/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { generateAddress } from "../../redux/actions";
import { windowHeight } from "../../utilts/windowHeight";

const Deposit = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const generatedAddress = useSelector(
    (state) => state.depositPage.data.address
  );

  const data = route.params.params;

  const createNewAddress = () => {
    dispatch(generateAddress(data));
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset="-160"
      >
        {/* чтобы клавиатура не закрывала инпут отрицательное значение */}
        <ImageBackground
          source={require("../../assets/bg.png")}
          style={styles.container}
          resizeMode="cover"
        >
          <Header
            onPress={() => {
              navigation.openDrawer();
              dispatch({ type: "CLEAR_ADDRESS" });
            }}
          >
            DEPOSIT
          </Header>
          <View style={styles.logo}>
            <Text style={styles.logo__text}>Deposit</Text>
          </View>

          <View style={styles.inputs}>
            <View style={styles.inputs__container}>
              <View style={styles.input__container}>
                <Text style={styles.label}>Address</Text>
                <TextInput value={generatedAddress} style={styles.input} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Deposit fee</Text>
                <Text style={{ width: 260 }}>
                  This deposit address accept only{" "}
                  <Text style={{ textTransform: "uppercase" }}>{data}</Text>.
                </Text>
                <Text>Do not send other coins to it.</Text>
              </View>
            </View>

            <View style={styles.button__container}>
              <CustomButton onPress={createNewAddress}>
                Generate address
              </CustomButton>
            </View>
          </View>
          <Footer />
        </ImageBackground>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    /* height: windowHeight, */
  },
  logo: {
    marginTop: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo__text: {
    fontSize: 25,
    color: "white",
  },
  balance: {
    position: "relative",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "#fff",
  },
  balance__num: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    paddingHorizontal: 12,
  },
  balance__usd: {
    /*   position: 'absolute',
    right: 0, */
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  inputs: {
    height: '80%',
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  input: {
    width: 280,
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
  },
  inputs__container: {
    marginTop: 32,
  },
  input__container: {
    /* alignItems: 'center',
    justifyContent: 'center', */
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    alignSelf: "flex-start",
    color: "#38383b",
    fontSize: 15,
    fontWeight: "bold",
  },
  button__container: {
    marginTop: 35,
    marginBottom: 100,
  },
});

export default Deposit;
