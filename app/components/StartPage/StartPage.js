import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Image,
} from "react-native";
import CustomButton from "../common/Button/CustomButton";
import Footer from "../common/Footer/Footer";
import Header from "../common/Header/Header";
import Balance from "../common/Balance/Balance";

import { useDispatch, useSelector } from "react-redux";
import { fetchWallets } from "../../redux/actions";

import AsyncStorage from "@react-native-community/async-storage";
import { windowHeight } from "../../utilts/windowHeight";
import axios from "axios";
import CustomButtonLight from "../common/Button/CustomButtonLight";

const StartPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [response, setResponse] = useState({});
  console.log("response in startPage", response);

  useEffect(() => {
    dispatch(fetchWallets());
  }, []);

  useEffect(() => {
    const fetchWallets = async () => {
      setIsloading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "http://185.181.8.210:8901/api/user/wallets",
        {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
          platform: "android",
          device_type: "mobile",
          captcha: "kQuA2nRYJ4R7jQVDpCVmk696SYnkV3y7",
        }
      );
      setResponse(response.data);
      setIsloading(false);
    };
    fetchWallets();
  }, []);

  const { total_usd } = response;

  const onPressDepositWithDraw = () => {
    navigation.navigate("Wallets");
  };

  const onPressSend = () => {
    navigation.navigate("Send");
  };

  const onPressMarcetplace = () => {
    Linking.openURL("http://185.181.8.210:8902/marketplace");
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={"height"} keyboardVerticalOffset="-160">
        {/* чтобы клавиатура не закрывала инпут отрицательное значение */}
        {response && (
          <View style={{ height: windowHeight }}>
            <ImageBackground
              source={require("../../assets/bg.png")}
              style={styles.container}
              resizeMode="cover"
            >
              <Header onPress={() => navigation.openDrawer()}>
               {/*  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  WELCOME TO INVIO
                </Text> */}
              </Header>
              <View style={{ alignItems: "center", marginTop: 40 }}>
                <Text style={styles.logo__text}>Available balance</Text>
              </View>

              <Balance name="" value={total_usd} />

              <View style={styles.inputs}>
                <View style={styles.button__container}>
                  {/* <Image
                    source={require("../../assets/images/navbar/wallets.png")}
                  /> */}
                  <CustomButton onPress={onPressDepositWithDraw}>
                    Deposit/Withdraw
                  </CustomButton>
                </View>
                <View style={styles.button__container}>
                  <CustomButtonLight onPress={onPressSend}>
                    Send
                  </CustomButtonLight>
                </View>
                <View style={styles.button__container}>
                  <CustomButton onPress={onPressMarcetplace}>
                    Marketplace
                  </CustomButton>
                </View>
              </View>
              {/* <Footer /> */}
            </ImageBackground>
            
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    flex: 1,
  },

  logo__text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  inputs: {
    flex: 1,
    marginTop: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  button__container: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StartPage;
