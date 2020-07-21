import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Header from "../common/Header/Header";
import CustomButton from "../common/Button/CustomButton";
import Footer from "../common/Footer/Footer";
import CustomButtonLight from "../common/Button/CustomButtonLight";
import CustomButtonLightSmall from "../common/Button/CustomButtonLightSmall";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallets } from "../../redux/actions";
import CustomModal from "../common/Modal/Modal";
import { windowHeight } from "../../utilts/windowHeight";
import BoxItem from "../common/BoxItem/BoxItem";
import AsyncStorage from "@react-native-community/async-storage";

const Wallets = ({ navigation }) => {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.walletsPage.data);
  const errors = useSelector((state) => state.walletsPage.errorMessagesWallet);
  useEffect(() => {
    dispatch(fetchWallets());
  }, []);

  const [userKyc, setUserKyc] = useState("");
  const [userBanDraw, setUserBanDraw] = useState(null);
  const [userBanDeposit, setUserBanDeposit] = useState(null);
  console.log("userbanDraw", userBanDraw);
  console.log("userBanDeposit", userBanDeposit);
  useEffect(() => {
    const getValues = async () => {
      const banDraw = await AsyncStorage.getItem("banDraw");
      const banDeposit = await AsyncStorage.getItem("banDeposit");
      const kyc = await AsyncStorage.getItem("kyc");

      setUserKyc(kyc);
      setUserBanDraw(banDraw);
      setUserBanDeposit(banDeposit);
    };
    getValues();
  }, []);

  const [totalPosts, setTotalPosts] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState(0);
  const [nameCurrency, setNameCurrency] = useState({});

  const [postsPerPage] = useState(4);
  const lastPage = Math.ceil(totalPosts / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    if (!response) {
      return;
    }
    setTotalPosts(response.wallets.length);
    setCurrentPosts(response.wallets.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost, response, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ScrollView>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/images/wallets/back.png")}
        style={styles.container}
      >
        <Header onPress={() => navigation.openDrawer()}>INVIO WALLET</Header>
        <View style={styles.logo}>
          <Text style={styles.logo__text}>Wallets</Text>
        </View>
        {errors ? (
          <CustomModal
            errors={errors}
            clearErrorMessage={() => dispatch({ type: "CLEAR_ERROR_WALLETS" })}
          />
        ) : null}
        {response && (
          <View style={styles.box}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={currentPosts}
              renderItem={({ item }) => (
                <BoxItem
                  key={item.id}
                  code={item.currency.code}
                  balance={item.balance.toFixed(2)}
                  onPress={() => {
                    setNameCurrency({
                      name: item.currency.code,
                      value: item.balance,
                      assetId: item.currency_id,
                      walletId: item.id,
                    });
                  }}
                />
              )}
            />
            <View style={styles.box__footer}>
              <Text style={styles.box__footerText}>Total Balance = </Text>
              {response && (
                <Text style={styles.box__footerText}>{response.total_usd}</Text>
              )}
            </View>
          </View>
        )}

        <View style={styles.switchContainer}>
          <TouchableWithoutFeedback
            disabled={currentPage === 1}
            onPress={() => paginate(--currentPage)}
          >
            <View
              style={[
                styles.switchLeft,
                currentPage === 1 ? styles.disabledSwitcher : null,
              ]}
            >
              <Image
                style={styles.arrowRight}
                source={require("../../assets/images/wallets/arrowLeft.png")}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            disabled={currentPage === lastPage}
            onPress={() => paginate(++currentPage)}
          >
            <View
              style={[
                styles.switchRight,
                currentPage === lastPage ? styles.disabledSwitcher : null,
              ]}
            >
              <Image
                style={styles.arrowRight}
                source={require("../../assets/images/wallets/arrowRight.png")}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.buttons}>
          <View style={styles.button__container}>
            <CustomButtonLight
              onPress={() => {
                if (userKyc.includes("not_verified")) {
                  dispatch({ type: "ERROR_WALLETS_NOTVEFIFIED" });
                } else if (+userBanDeposit) {
                  dispatch({ type: "ERROR_WALLETS_BAN" });
                } else if (userKyc.includes("pending")) {
                  dispatch({ type: "ERROR_WALLETS_PENDING" });
                } else if (!nameCurrency.name) {
                  dispatch({ type: "ERROR_WALLETS" });
                } else {
                  navigation.navigate("Deposit", {
                    screen: "Wallets",
                    params: nameCurrency.name,
                  });
                }
              }}
            >
              Deposit
            </CustomButtonLight>
          </View>
          <View style={styles.button__container}>
            <CustomButton
              onPress={() => {
                if (userKyc.includes("not_verified")) {
                  dispatch({ type: "ERROR_WALLETS_NOTVEFIFIED" });
                } else if (userKyc.includes("pending")) {
                  dispatch({ type: "ERROR_WALLETS_PENDING" });
                } else if (+userBanDraw) {
                  dispatch({ type: "ERROR_WALLETS_BAN" });
                } else if (!nameCurrency.name) {
                  dispatch({ type: "ERROR_WALLETS" });
                } else {
                  navigation.navigate("WithDraw", {
                    screen: "Wallets",
                    params: nameCurrency,
                  });
                }
              }}
            >
              Withdraw
            </CustomButton>
          </View>
          <View style={styles.buttonSmall__container}>
            <CustomButtonLightSmall style={styles.smallButton}>
              Buy
            </CustomButtonLightSmall>
            <CustomButtonLightSmall>Sell</CustomButtonLightSmall>
          </View>
        </View>
      </ImageBackground>
      <Footer />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: windowHeight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: 53,
  },
  logo__text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    /* fontFamily: 'Montserrat-Bold', */
    fontWeight: "bold",
  },
  box: {
    marginTop: 20,
    height: 200,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
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
  switchContainer: {
    marginVertical: 35,
    flex: 1,
    flexDirection: "row",
  },
  switchLeft: {
    height: 32,
    width: 52,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  switchRight: {
    height: 32,
    width: 52,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  disabledSwitcher: {
    backgroundColor: "#b8b8b8",
  },
  buttons: {
    width: "100%",
    paddingTop: 23,
    marginTop: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  button__container: {
    marginVertical: 10,
  },
  buttonSmall__container: {
    width: 280,
    marginTop: 7,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowRight: {
    position: "absolute",
    top: 10,
    left: 26,
  },
});

export default Wallets;
