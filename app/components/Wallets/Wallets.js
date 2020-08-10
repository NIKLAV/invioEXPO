import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Linking,
  RefreshControl,
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
import axios from "axios";

const Wallets = ({ navigation }) => {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.walletsPage.data);
  const errors = useSelector((state) => state.walletsPage.errorMessagesWallet);
  /* const loading = useSelector((state) => state.walletsPage.loading) */
  const [refresh, setRefresh] = useState(false);
  const onRefresh = () => {
    setRefresh(true);
  };

  useEffect(() => {
    dispatch(fetchWallets());
    setRefresh(false);
  }, [refresh]);

  const [userKyc, setUserKyc] = useState("");
  const [userBanDraw, setUserBanDraw] = useState(null);
  const [userBanDeposit, setUserBanDeposit] = useState(null);

  /* useEffect(() => {
    const getValues = async () => {
      const banDraw = await AsyncStorage.getItem("banDraw");
      const banDeposit = await AsyncStorage.getItem("banDeposit");
      const kyc = await AsyncStorage.getItem("kyc");

      setUserKyc(kyc);
      setUserBanDraw(banDraw);
      setUserBanDeposit(banDeposit);
    };
    getValues();
  }, []); */

  const getBansAndStatus = useCallback(async () => {
    /*  setLoading(true); */

    const token = await AsyncStorage.getItem("token");
    const response = await axios
      .get(`http://185.181.8.210:8901/api/user/data`, {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
        platform: "android",
        device_type: "mobile",
        captcha: "kQuA2nRYJ4R7jQVDpCVmk696SYnkV3y7",
      })
      .catch((err) => console.log("error in wallets", err));
    setUserKyc(response.data.user.kyc_status);
    setUserBanDraw(response.data.user.ban_withdraw);
    setUserBanDeposit(response.data.user.ban_deposit);
    /* setLoading(false); */
    console.log("response in wallets effect", response);
    setRefresh(false);
  }, []);

  useEffect(() => {
    getBansAndStatus();
  }, [refresh]);

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

  const [touchedC, setTouchedC] = useState("");

  const url = nameCurrency.name ? nameCurrency.name.toUpperCase() : "";

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
      <View style={{ height: windowHeight }}>
        <ImageBackground
          resizeMode="cover"
          source={require("../../assets/images/wallets/back.png")}
          style={styles.container}
        >
          <Header onPress={() => navigation.openDrawer()}>
            <Text style={{ fontWeight: "bold", fontSize: 28, fontFamily: 'Montserrat-Bold' }}>WALLETS</Text>
          </Header>
          {/* <View style={styles.logo}>
            <Text style={styles.logo__text}>Wallets</Text>
          </View> */}
          {errors ? (
            <CustomModal
              errors={errors}
              clearErrorMessage={() =>
                dispatch({ type: "CLEAR_ERROR_WALLETS" })
              }
            />
          ) : null}
          {response && (
            <View style={styles.box}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={currentPosts}
                renderItem={({ item }) => (
                  <BoxItem
                    touchedC={touchedC}
                    setTouchedC={setTouchedC}
                    key={item.id}
                    code={item.currency.code}
                    balance={item.balance.toFixed(8)}
                    onPress={() => {
                      setNameCurrency({
                        name: item.currency.code,
                        value: item.balance,
                        assetId: item.currency_id,
                        walletId: item.id,
                        deposit_fee: item.currency.deposit_fee,
                        withdraw_max: item.currency.withdraw_max,
                        withdraw_min: item.currency.withdraw_min,
                        withdraw_fee: item.currency.withdraw_fee,
                        withdraw_available_day: item.withdraw_available_day,
                      });

                      dispatch({
                        type: "SEND_PARAMS_ON_DEPOSIT_OR_WITHDRAW",
                        payload: {
                          name: item.currency.code,
                          value: item.balance,
                          assetId: item.currency_id,
                          walletId: item.id,
                          deposit_fee: item.currency.deposit_fee,
                          withdraw_max: item.currency.withdraw_max,
                          withdraw_min: item.currency.withdraw_min,
                          withdraw_fee: item.currency.withdraw_fee,
                          withdraw_available_day: item.withdraw_available_day,
                        },
                      });
                    }}
                  />
                )}
              />
              <View style={styles.box__footer}>
                <Text style={styles.box__footerText}>Total balance: </Text>
                {response && (
                  <Text style={styles.box__footerText}>
                    {response.total_usd} USD
                  </Text>
                )}
              </View>
            </View>
          )}
          {totalPosts > 5 ? (
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
          ) : null}

          <View style={styles.buttons}>
            <View style={styles.button__container}>
              <CustomButtonLight
                onPress={async () => {
                  await getBansAndStatus().then(() => {
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
                        /*  params: nameCurrency.name, */
                      });
                    }
                  });
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
                      /* params: nameCurrency, */
                    });
                  }
                }}
              >
                Withdraw
              </CustomButton>
            </View>
            <View style={styles.buttonSmall__container}>
              <CustomButtonLightSmall
                onPress={
                  () =>
                    Linking.openURL(
                      `http://185.181.8.210:8902/marketplace/buy/${url}`
                    ) /* props.navigation.navigate('Transactions') */
                }
              >
                Buy
              </CustomButtonLightSmall>
              <CustomButtonLightSmall
                onPress={
                  () =>
                    Linking.openURL(
                      `http://185.181.8.210:8902/marketplace/sell/${url}`
                    ) /* props.navigation.navigate('Transactions') */
                }
              >
                Sell
              </CustomButtonLightSmall>
              {/* <CustomButtonLightSmall>Sell/Buy</CustomButtonLightSmall> */}
            </View>
          </View>
          {/* <Footer /> */}
        </ImageBackground>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    /* height: windowHeight, */
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    marginTop: 25,
  },
  logo__text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    /* fontFamily: 'Montserrat-Bold', */
    fontWeight: "bold",
  },
  box: {
    marginTop: 60,
    height: 175,
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
    marginTop: 15,
    /* flex: 1 */
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
    flex: 1,
    width: "100%",
    paddingTop: 23,
    marginTop: 70,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button__container: {
    marginVertical: 20,
  },
  buttonSmall__container: {
    paddingBottom: 10,
    width: 280,
    marginTop: 20,
    marginBottom: 10,
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
