import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from "react-native";
import CustomButton from "../common/Button/CustomButton";
import Footer from "../common/Footer/Footer";
import Header from "../common/Header/Header";
import Balance from "../common/Balance/Balance";
import CustomModal from "../common/Modal/Modal";

import { useDispatch, useSelector } from "react-redux";
import { sendCurrency, fetchWallets } from "../../redux/actions";

import AsyncStorage from "@react-native-community/async-storage";
import { windowHeight } from "../../utilts/windowHeight";
import axios from "axios";

const WithDraw = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.walletsPage.currencyData);
  const [refresh, setRefresh] = useState(false);
  const page = useSelector((state) => state.historyPage.page);

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
  };

  const [info, setInfo] = useState({
    /* withdraw_max: data.withdraw_max,
    withdraw_min: data.withdraw_min,
    withdraw_fee: data.withdraw_fee,
    withdraw_available_day: data.withdraw_available_day, */
  });
  console.log("info", info);

  /* useEffect(() => {
    setInfo({
      withdraw_max: data.withdraw_max,
      withdraw_min: data.withdraw_min,
      withdraw_fee: data.withdraw_fee,
      withdraw_available_day: data.withdraw_available_day,
    });
    setCurrentValue(data.value);
    
  }, [data, refresh]); */

  const onPress = () => {
    if (amount.length === 0 || address.length === 0) {
      dispatch({ type: "ADD_ERROR_LENGTH" });
    } else if (amount.replace(",", ".") > currentValue) {
      dispatch({ type: "ADD_ERROR_AMOUNT" });
    } else if (amount.replace(",", ".") > info.withdraw_available_day) {
      dispatch({
        type: "ADD_ERROR_MAX_DAY",
      });
    } else if (amount.replace(",", ".") > info.withdraw_max) {
      dispatch({
        type: "ADD_ERROR_AMOUNT_MAX",
        payload: { code: data.name, max: info.withdraw_max },
      });
    } else if (amount.replace(",", ".") < info.withdraw_min) {
      dispatch({
        type: "ADD_ERROR_MIN_AMOUNT",
        payload: { code: data.name, min: info.withdraw_min },
      });
    } else
      dispatch(
        sendCurrency(
          data.walletId,
          data.assetId,
          amount.replace(",", "."),
          address,
          page
        )
      );
  };

  const errors = useSelector((state) => state.withDrawPage.errorMessages);
  useEffect(() => {
    if (Array.isArray(errors) && errors.includes("Successfully!")) {
      setAddress("");
      setAmount("");
    }
  }, [errors]);

  const clearErrorMessage = () => {
    dispatch({ type: "CLEAR_ERROR_DRAW" });
  };

  /* const data = route.params.params; */

  useEffect(() => {
    console.log("inEffect", data.name);

    const fetchCurrentValue = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios
        .get(`http://185.181.8.210:8901/api/user/wallets/${data.name}`, {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        })
        .then((response) => {
          console.log("response in withdraw", response);
          setLoading(false);
          setCurrentValue(response.data.wallet.balance);
          setInfo({
            ...info,
            withdraw_max: response.data.wallet.asset.withdraw_max,
            withdraw_min: response.data.wallet.asset.withdraw_min,
            withdraw_fee: response.data.wallet.asset.withdraw_fee,
            withdraw_available_day: response.data.wallet.withdraw_available_day,
          });
        });
    };
    fetchCurrentValue();
    setRefresh(false)
    
  }, [errors, refresh, data]);

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
      <KeyboardAvoidingView behavior={"height"} keyboardVerticalOffset="-160">
        {/* чтобы клавиатура не закрывала инпут отрицательное значение */}
        <View style={{ height: windowHeight }}>
          <ImageBackground
            source={require("../../assets/bg.png")}
            style={styles.container}
            resizeMode="cover"
          >
            <Header onPress={() => navigation.openDrawer()}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>WITHDRAW</Text>
            </Header>
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text style={styles.logo__text}>Availible balance:</Text>
            </View>

            <Balance name={data.name} value={currentValue} />

            <View style={styles.inputs}>
              {errors ? (
                <CustomModal
                  errors={errors}
                  clearErrorMessage={clearErrorMessage}
                />
              ) : null}
              <View style={styles.inputs__container}>
                <View style={styles.input__container}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    onChangeText={(address) => setAddress(address)}
                    value={address}
                    style={styles.input}
                  />
                </View>

                <View style={styles.input__container}>
                  <Text style={styles.label}>Amount</Text>
                  <TextInput
                    onChangeText={(amount) => setAmount(amount)}
                    value={amount}
                    style={styles.input}
                  />
                  {!loading && Object.keys(info).length > 0 ? (
                    <>
                      <Text style={styles.after_input}>
                        Maximum {data.name.toUpperCase()} Withdrawal:{" "}
                        {info.withdraw_max}
                        {/* {data.withdraw_max} */} {data.name.toUpperCase()}
                      </Text>
                      <Text style={styles.after_input}>
                        Minimum {data.name.toUpperCase()} Withdrawal:{" "}
                        {info.withdraw_min}
                        {/* {data.withdraw_min} */} {data.name.toUpperCase()}
                      </Text>
                      <Text style={styles.after_input}>
                        Withdrawal fee: {info.withdraw_fee}{" "}
                        {/*  {data.withdraw_fee} */} %
                      </Text>
                      <Text style={styles.after_input}>
                        Available withdrawal per day:{" "}
                        {info.withdraw_available_day}{" "}
                        {/* {data.withdraw_available_day} */}{" "}
                        {data.name.toUpperCase()}
                      </Text>
                    </>
                  ) : null}
                </View>
              </View>

              <View style={styles.button__container}>
                <CustomButton onPress={onPress}>Withdraw</CustomButton>
              </View>
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
    flexDirection: "column",
    width: "100%",
    flex: 1,
  },
  logo: {
    marginTop: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo__text: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
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
    flex: 1,
    marginTop: 20,
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
  },
  inputs__container: {
    /* marginTop: 32, */
  },
  input__container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    alignSelf: "flex-start",
    color: "#38383b",
    fontSize: 15,
    fontWeight: "bold",
  },
  after_input: {
    marginVertical: 4,
    color: "#38383b",
    fontSize: 15,
  },
  button__container: {
    marginTop: 15,
  },
});

export default WithDraw;
