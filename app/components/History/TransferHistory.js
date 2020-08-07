import React, { useEffect, useState } from "react";
import Header from "../common/Header/Header";
import {
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import Footer from "../common/Footer/Footer";
import Accordian from "../common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransfer } from "../../redux/actions";
import { Preloader, Spiner } from "../common/Preloader/preloader";
import CustomButton from "../common/Button/CustomButton";
import { NothingToShow } from "../common/NothingToShow/NothingToShow";
import TabBar from "../common/TabBar/TabBar";
import AsyncStorage from "@react-native-community/async-storage";
import { FlatList } from "react-native-gesture-handler";
import { windowHeight } from "../../utilts/windowHeight";
import { useNavigationState } from "@react-navigation/native";

const TransferHistory = ({ navigation /* touched, setTouched */ }) => {
  const page = useSelector((state) => state.transferPage.page);
  const lastPage = useSelector((state) => state.transferPage.lastPage);
  const loading = useSelector((state) => state.transferPage.loading);
  const [disableButton, setDisableButton] = useState(false);

  function checkCoin(q) {
    switch (q) {
      case 3:
        return "usdt";
      case 4:
        return "usdc";
      case 5:
        return "dai";
      case 6:
        return "pax";
      default:
        q;
    }
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransfer(page));
  }, [page]);

  const onList = () => {
    if (page < lastPage) {
      dispatch({ type: "NEXT_PAGE" });
    }
  };

  const transfer = useSelector((state) => state.transferPage.data);
  const [userName, setUsername] = useState("");
  useEffect(() => {
    const getName = async () => {
      const name = await AsyncStorage.getItem("name");
      setUsername(name);
    };
    getName();
  }, []);

  /* const renderAccordians = () => {
    const items = [];

    let i = 1;

    for (let item of transfer) {
      items.push(
       <Accordian
          key={item.created_at}
          title={item.created_at}
          list={
            <View key={item.created_at} style={styles.child}>
              <View style={styles.child__item}>
                <View style={styles.test}>
                  <Text style={styles.child__item__text}>Date/Time</Text>
                </View>
                <Text style={styles.child__item__value}>{item.created_at}</Text>
              </View>
              <View style={styles.child__item}>
                <View style={styles.test}>
                  <Text style={styles.child__item__text}>Coin</Text>
                </View>
                <Text style={styles.child__item__value}>
                  {checkCoin(item.asset_id)}
                </Text>
              </View>
              <View style={styles.child__item}>
                <View style={styles.test}>
                  <Text style={styles.child__item__text}>Amount</Text>
                </View>
                <Text style={styles.child__item__value}>{item.amount}</Text>
              </View>
              <View style={styles.child__item}>
                <View style={styles.test}>
                  <Text style={styles.child__item__text}>Send</Text>
                </View>
                <Text style={styles.child__item__value}>{item.to_user}</Text>
              </View>
            </View>
          }
        />
      );
      i++;
    }
    return items;
  };  */

  return (
    <ScrollView>
      {!loading && transfer.length === 0 ? (
        <NothingToShow
         title='TRANSFER HISTORY'
          navigation={navigation}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ) : !loading && transfer && transfer.length > 0 ? (
        <View>
          <ImageBackground
            resizeMode="cover"
            source={require("../../assets/images/transactions/back.png")}
            style={styles.container}
          >
            <Header
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              TRANSFER HISTORY
            </Header>
            <TabBar navigation={navigation} />
            {transfer ? (
              <View style={styles.accordionContainer}>
                {transfer.map((item) => (
                  <View
                    key={item.created_at}
                    style={[
                      styles.item__container,
                      item.id % 2 === 0 ? styles.color : null,
                      item === transfer[0] ? styles.border : null,
                    ]}
                  >
                    {item.to_user === userName ? (
                      <View style={styles.item__text}>
                        <Text>
                          <Text style={styles.name}>{item.from_user}</Text> paid
                          you
                        </Text>
                        <Text style={styles.take}>
                          + {item.amount} {item.asset_code.toUpperCase()}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.item__text}>
                        <View>
                          <Text style={styles.name}>{item.to_user}</Text>
                          <Text>got your transfer</Text>
                        </View>
                        <View>
                          <Text style={styles.send}>
                            - {item.amount} {item.asset_code.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                    )}
                    <Text style={styles.item__data}>{item.created_at}</Text>
                  </View>
                ))}
                {page < lastPage && (
                  <View style={{ marginTop: 55, marginBottom: 55 }}>
                    <CustomButton onPress={() => onList()}>
                      loading more
                    </CustomButton>
                  </View>
                )}

                {loading ? <Preloader /> : null}
              </View>
            ) : null}
            {/* <Footer /> */}
          </ImageBackground>
        </View>
      ) : (
        <Spiner />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
  },
  child: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
  },
  child__item: {
    height: 45,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e1e1e1",
    width: "100%",
  },
  child__item__text: {
    /*  display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center', */
    paddingLeft: 8,
    /* height: 45, */
    /* width: "40%", */
    /* backgroundColor: "#f4f4f4", */
    /* textAlignVertical: "center", */
  },
  child__item__value: {
    /* height: 45, */
    paddingLeft: 8,
    width: "60%",
    backgroundColor: "#fff",
    textAlignVertical: "center",
  },
  accordionContainer: {
    flex: 2,
    /*   paddingTop: 50,
    paddingBottom: 50, */
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  load_more: {
    height: 100,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  test: {
    display: "flex",
    justifyContent: "center",
    /*  alignItems: 'center', */
    flexDirection: "column",
    width: "40%",
    height: 45,
    backgroundColor: "#f4f4f4",
    textAlignVertical: "center",
    borderBottomWidth: 1,
    borderColor: "#e1e1e1",
  },
  item__container: {
    width: "100%",
    height: 65,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  item__text: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  item__data: {
    paddingLeft: 20,
  },
  take: {
    color: "#36b526",
  },
  send: {
    color: "#dd4444",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  color: {
    backgroundColor: "#efefef",
  },
  border: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default TransferHistory;
