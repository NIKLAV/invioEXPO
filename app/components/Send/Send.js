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
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import CustomButton from "../common/Button/CustomButton";
import Footer from "../common/Footer/Footer";
import Header from "../common/Header/Header";
import CurrencyBox from "../common/CurrencyBox/CurrencyBox";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../common/Modal/Modal";
import { sendSEND } from "../../redux/actions";
import { windowHeight } from "../../utilts/windowHeight";
import BoxItem from "../common/BoxItem/BoxItem";
import AsyncStorage from "@react-native-community/async-storage";

const Send = ({ navigation }) => {
  const [userKyc, setUserKyc] = useState("");
  const [userSendBan, setUserSendBan] = useState(null);

  const onPress = () => {
    if (userKyc.includes("not_verified")) {
      dispatch({ type: "ERROR_WALLETS_NOTVEFIFIED" });
    } else if (userKyc.includes("pending")) {
      dispatch({ type: "ERROR_WALLETS_PENDING" });
    } else if (+userSendBan) {
      dispatch({ type: "ERROR_WALLETS_BAN" });
    } else if (amount.length === 0 || username.length === 0 || !chooseId) {
      dispatch({ type: "ADD_ERROR_LENGTH_SEND" });
    } else if (amount > value) {
      dispatch({ type: "ADD_ERROR_AMOUNT_SEND" });
    } else dispatch(sendSEND(chooseId, amount, username, currencyCode));
  };

  useEffect(() => {
    const getValues = async () => {
      const kyc = await AsyncStorage.getItem("kyc");
      const sendBan = await AsyncStorage.getItem("banTransfer");
      setUserKyc(kyc);
      setUserSendBan(sendBan);
    };
    getValues();
  }, []);

  const [username, setUserName] = useState("");
  const [amount, setAmount] = useState("");
  const [chooseId, setChooseId] = useState("");
  const [value, setValue] = useState();
  const [currencyCode, setCurrencyCode] = useState("");
  /* const [assetId, setIssetid] = useState('') */

  const dispatch = useDispatch();
  const response = useSelector((state) => state.walletsPage.data);
  let errors = useSelector((state) => state.sendPage.errorMessagesSend);
  useEffect(() => {
    if (errors.username) {
      errors = errors.username;
    } else if (errors.amount) {
      errors = errors.amount;
    }
    if (errors.includes("Successfully!")) {
      setUserName("");
      setAmount("");
    }
  }, [errors]);

  const [touched, setTouched] = useState("");

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset="-260"
      >
        {/* чтобы клавиатура не закрывала инпут отрицательное значение */}
        <ImageBackground
          source={require("../../assets/bg.png")}
          style={styles.container}
          resizeMode="cover"
        >
          <Header onPress={() => navigation.openDrawer()}>SEND</Header>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={styles.logo__text}>Send</Text>
          </View>
          <View style={styles.box}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={response.wallets}
              renderItem={({ item }) => (
                <BoxItem
                  touched={touched}
                  setTouched={setTouched}
                  balance={item.balance.toFixed(2)}
                  code={item.currency.code}
                  onPress={() => {
                    setChooseId(item.currency_id);
                    setValue(item.balance);
                  }}
                />
                /*   <View key={item.id} style={[styles.box__item]}>
                  <Text
                    onPress={() => {
                      setChooseId(item.currency_id);
                      setValue(item.balance);
                    }}
                    style={styles.box__itemText}
                  >
                    {item.currency.code}
                  </Text>

                  <Text style={styles.box__itemText}>
                    {item.balance.toFixed(2)}
                  </Text>
                </View> */
              )}
            />
            <View style={styles.box__footer}>
              <Text style={styles.box__footerText}>Total Balance = </Text>
              {response && (
                <Text style={styles.box__footerText}>{response.total_usd}</Text>
              )}
            </View>
          </View>

          {errors ? (
            <CustomModal
              errors={errors}
              clearErrorMessage={() => dispatch({ type: "CLEAR_ERROR_SEND" })}
            />
          ) : null}

          <View style={styles.inputs}>
            <View style={styles.inputs__container}>
              <View style={styles.input__container}>
                <Text style={styles.label}>User</Text>
                <TextInput
                  onChangeText={(username) => setUserName(username)}
                  value={username}
                  style={styles.input}
                />
              </View>
              <View style={styles.input__container}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  value={amount}
                  style={styles.input}
                  onChangeText={(amount) => setAmount(amount)}
                />
              </View>
            </View>

            <View style={styles.button__container}>
              <CustomButton onPress={onPress}>Send</CustomButton>
            </View>
          </View>
        </ImageBackground>
        <Footer />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",

    /*  flexDirection: "column", */
    width: "100%",
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
    fontWeight: "bold",
  },
  balance__num: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    paddingHorizontal: 12,
  },
  box: {
    marginTop: 20,
    height: 200,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#1a1a1b",
    borderRadius: 10,
  },
  box__item: {
    paddingVertical: 8,
    paddingLeft: 10,
    paddingRight: 10,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box__itemTouched: {
    backgroundColor: "#a4a5a7",
  },
  box__itemText: {
    color: "#fff",
  },
  box__footer: {
    width: 300,
    height: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#000",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  box__footerText: {
    paddingLeft: 15,
    paddingRight: 10,
    color: "#fff",
    fontSize: 15,
  },
  inputs: {
    /* height: windowHeight, */
    paddingBottom: 20,
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

export default Send;
