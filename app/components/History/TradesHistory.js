import React, { useEffect, useState } from "react";
import Header from "../common/Header/Header";
import {
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import Footer from "../common/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrades } from "../../redux/actions";
import { Preloader, Spiner } from "../common/Preloader/preloader";
import CustomButton from "../common/Button/CustomButton";
import { NothingToShow } from "../common/NothingToShow/NothingToShow";
import TabBar from "../common/TabBar/TabBar";
import AsyncStorage from "@react-native-community/async-storage";
import { windowHeight } from "../../utilts/windowHeight";
import { useNavigationState } from "@react-navigation/native";

const TradesHistory = ({ navigation }) => {
  const page = useSelector((state) => state.tradePage.page);
  const lastPageBuy = useSelector((state) => state.tradePage.lastPageBuy);
  const lastPageSell = useSelector((state) => state.tradePage.lastPageSell);
  const loading = useSelector((state) => state.tradePage.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrades(page));
  }, [page]);

  const onList = () => {
    if (page < lastPage) {
      dispatch({ type: "NEXT_PAGE_TRADE" });
    }
  };

  const tradesBuy = useSelector((state) => state.tradePage.buy);
  const tradesSell = useSelector((state) => state.tradePage.sell);
  console.log("tradesBuy", tradesBuy);
  console.log("tradesSell", tradesSell);

  const [userName, setUsername] = useState("");
  useEffect(() => {
    const getName = async () => {
      const name = await AsyncStorage.getItem("name");
      setUsername(name);
    };
    getName();
  }, []);
  const trades = ["s", "s"];
  return (
    <ScrollView>
      {!loading && trades.length === 0 ? (
        <NothingToShow
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ) : !loading && trades && trades.length > 0 ? (
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
              TRADES HISTORY
            </Header>
            <TabBar navigation={navigation} />
            {trades ? (
              <View style={styles.accordionContainer}>
                {tradesBuy.map((item) => (
                  <View
                    key={item.created_at}
                    style={[
                      styles.item__container,
                      item.id % 2 === 0 ? styles.color : null,
                      item === tradesBuy[0] ? styles.border : null,
                      item !== tradesBuy[0] ? styles.line : null,
                    ]}
                  >
                    {item.buyer_username === userName ? (
                      <View style={styles.item__text}>
                        <Text>
                          <Text>Trade with</Text>{" "}
                          <Text style={styles.name}>{item.buyer_username}</Text>
                        </Text>
                        <Text style={styles.take}>
                          + {Number(item.amount).toFixed(8)}{" "}
                          {item.asset_code.toUpperCase()}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.item__text}>
                        <View>
                          <Text>
                            <Text style={{ color: "#fff" }}>Trade with</Text>{" "}
                            <Text style={styles.name}>
                              {item.buyer_username}
                            </Text>
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.send}>
                            - {Number(item.amount).toFixed(8)}{" "}
                            {item.asset_code.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                    )}
                    <Text style={styles.item__data}>{item.created_at}</Text>
                  </View>
                ))}
                {page < lastPageBuy && (
                  <View style={{ marginTop: 55 }}>
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
   /*  height: windowHeight, */
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
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
    width: "88%",
    height: 65,
    backgroundColor: "#515151",
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
    color: "#fff",
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
    color: "#fff",
  },
  color: {
    backgroundColor: "#efefef",
  },
  border: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  line: {
    borderTopWidth: 1,
    borderTopColor: "#fff",
  },
});

export default TradesHistory;
