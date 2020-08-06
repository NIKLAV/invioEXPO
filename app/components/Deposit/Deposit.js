import React, { useEffect, useState, useCallback } from "react";
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
  RefreshControl,
} from "react-native";
import CustomButton from "../common/Button/CustomButton";
import Footer from "../common/Footer/Footer";
import Header from "../common/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { generateAddress, fetchWallets } from "../../redux/actions";
import { windowHeight } from "../../utilts/windowHeight";
import Balance from "../common/Balance/Balance";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

const Deposit = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const generatedAddress = useSelector(
    (state) => state.depositPage.data.address
  );
  const name = useSelector((state) => state.walletsPage.currencyData.name);
  /* const value = useSelector((state) => state.walletsPage.currencyData.value); */
  /* const deposit_fee = useSelector(
    (state) => state.walletsPage.currencyData.deposit_fee
  ); */

  /* const loading = useSelector((state) => state.walletsPage.loading); */
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false);
  console.log("loading", loading);
  const [deposit_fee, setDeposit_Fee] = useState(null);
  const [value, setValue] = useState(null)
  console.log("deposit fee", deposit_fee);
  /* const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []); */

  useEffect(() => {
    const getCurrentCurrency = async (name) => {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios
        .get(`http://185.181.8.210:8901/api/user/wallets/${name}`, {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
          platform: "android",
          device_type: "mobile",
          captcha: "kQuA2nRYJ4R7jQVDpCVmk696SYnkV3y7",
        })
        .catch((err) => console.log("error in wallets", err));
      setDeposit_Fee(response.data.wallet.asset.deposit_fee);
      setValue(response.data.wallet.balance);
      setLoading(false);
      console.log("response in deposit", response);
      setRefresh(false)
    };

    getCurrentCurrency(name);
  }, [refresh, name]);

  /* const data = route.params.params; */

  const createNewAddress = () => {
    dispatch(generateAddress(name));
  };

  const onRefresh = () => {
    setRefresh(true)
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          progressBackgroundColor="#38383b"
          tintColor="#38383b"
          refreshing={refresh}
          onRefresh={onRefresh}
        />
      }
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset="-160"
      >
        {/* чтобы клавиатура не закрывала инпут отрицательное значение */}
        <View style={{ flex: 1 }}>
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
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>DEPOSIT</Text>
            </Header>
            <View style={styles.logo}>
              <Balance name={name} value={value} />
            </View>

            <View style={styles.inputs}>
              <View style={styles.inputs__container}>
                <View style={styles.input__container}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput value={generatedAddress} style={styles.input} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.label}>Deposit fee: {deposit_fee}%</Text>
                  <Text style={{ width: 260 }}>
                    This deposit address accept only{" "}
                    <Text style={{ textTransform: "uppercase" }}>{name}</Text>.
                  </Text>
                  <Text>Do not send other coins to it.</Text>
                </View>
              </View>

              <View style={styles.button__container}>
                <CustomButton onPress={createNewAddress}>
                  Generate address
                </CustomButton>
              </View>
              {/*  <CustomButtonLightSmall onPress={Clipboard.setString('sss')}>
                  Copy address
                </CustomButtonLightSmall> */}
            </View>
            {/* <Footer /> */}
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    /* height: "100%", */
    height: windowHeight,
    /* justifyContent: "center", */
  },
  logo: {
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    flex: 1,
    /* paddingBottom: 80, */
    marginTop: 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 280,
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    textAlign: "center",
  },
  /*   inputs__container: {
    marginTop: 32,
  }, */
  input__container: {
    /* alignItems: 'center',
    justifyContent: 'center',  */
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
    marginTop: 40,
  },
});

export default Deposit;
