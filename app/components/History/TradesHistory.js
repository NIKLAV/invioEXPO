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
import { useDispatch, useSelector } from "react-redux";
import { fetchTrades } from "../../redux/actions";
import { Preloader, Spiner } from "../common/Preloader/preloader";
import CustomButton from "../common/Button/CustomButton";
import { NothingToShow } from "../common/NothingToShow/NothingToShow";
import TabBar from "../common/TabBar/TabBar";
import AsyncStorage from "@react-native-community/async-storage";
import { windowHeight } from "../../utilts/windowHeight";
import { useNavigationState } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

const TradesHistory = ({ navigation }) => {
  const page = useSelector((state) => state.tradePage.page);
  const lastPageBuy = useSelector((state) => state.tradePage.lastPageBuy);
  const lastPageSell = useSelector((state) => state.tradePage.lastPageSell);
  const all = useSelector((state) => state.tradePage.all);
  const loading = useSelector((state) => state.tradePage.loading);
  console.log("all in historytrades", all);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrades(page));
  }, [page]);

  const onList = () => {
    if (page < lastPage) {
      dispatch({ type: "NEXT_PAGE_TRADE" });
    }
  };

  /* const tradesBuy = useSelector((state) => state.tradePage.buy);
  const tradesSell = useSelector((state) => state.tradePage.sell);
  console.log("tradesBuy", tradesBuy);
  console.log("tradesSell", tradesSell); */

  const [userName, setUsername] = useState("");
  useEffect(() => {
    const getName = async () => {
      const name = await AsyncStorage.getItem("name");
      setUsername(name);
    };
    getName();
  }, []);

  return (
    <SafeAreaView>
      {!loading && all.length === 0 ? (
        <NothingToShow
          title="TRADES HISTORY"
          navigation={navigation}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ) : !loading && all && all.length > 0 ? (
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
            {all ? (
              <View style={styles.accordionContainer}>
                {/* <FlatList
                  onEndReachedThreshold={0.6}
                  onEndReached={() => onList()}
                  data={all}
                  renderItem={({ item }) => (
                    <View key={item.created_at} style={styles.item__container}>
                      <View style={styles.item__text}>
                        <View>
                          <Text>
                            <Text style={{ color: "#5e5e5e" }}>
                              Trade with{" "}
                              {item.buyer_username === userName ? (
                                <Text style={styles.name}>
                                  {item.seller_username}
                                </Text>
                              ) : (
                                <Text style={styles.name}>
                                  {item.buyer_username}
                                </Text>
                              )}
                            </Text>{" "}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.item__data}>
                            {item.created_at}
                          </Text>
                        </View>
                      </View>
                      <View style={{ paddingLeft: 10 }}>
                        <Text>
                          paid -
                          {item.buyer_username !== userName ? (
                            <Text style={styles.send}>
                              {Number(item.amount).toFixed(8) +
                                item.asset_code.toUpperCase()}
                            </Text>
                          ) : (
                            <Text style={styles.send}>
                              {Number(item.price).toFixed(8)}
                            </Text>
                          )}
                        </Text>
                        <Text>
                          got +
                          {item.buyer_username === userName ? (
                            <Text style={styles.take}>
                              {Number(item.amount).toFixed(8) +
                                item.asset_code.toUpperCase()}
                            </Text>
                          ) : (
                            <Text style={styles.take}>
                              {Number(item.price).toFixed(8)}
                            </Text>
                          )}
                        </Text>
                      </View>
                    </View>
                  )}
                /> */}
                {all.map((item) => (
                  <View key={item.created_at} style={styles.item__container}>
                    <View style={styles.item__text}>
                      <View>
                        <Text>
                          <Text style={{ color: "#5e5e5e" }}>
                            Trade with{" "}
                            {item.buyer_username === userName ? (
                              <Text style={styles.name}>
                                {item.seller_username}
                              </Text>
                            ) : (
                              <Text style={styles.name}>
                                {item.buyer_username}
                              </Text>
                            )}
                          </Text>{" "}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.item__data}>{item.created_at}</Text>
                      </View>
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                      <Text>
                        paid -
                        {item.buyer_username !== userName ? (
                          <Text style={styles.send}>
                            {Number(item.amount).toFixed(8) +
                              item.asset_code.toUpperCase()}
                          </Text>
                        ) : (
                          <Text style={styles.send}>
                            {Number(item.price).toFixed(8)}
                          </Text>
                        )}
                      </Text>
                      <Text>
                        got +
                        {item.buyer_username === userName ? (
                          <Text style={styles.take}>
                            {Number(item.amount).toFixed(8) +
                              item.asset_code.toUpperCase()}
                          </Text>
                        ) : (
                          <Text style={styles.take}>
                            {Number(item.price).toFixed(8)}
                          </Text>
                        )}
                      </Text>
                    </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
  item__container: {
    width: "100%",
    height: 75,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    borderRadius: 15,
    marginVertical: 10,
  },
  item__text: {
    /* width: '90%', */
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    /* alignItems: "flex-start", */
  },
  item__data: {
    color: "#5e5e5e",
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
    color: "#212123",
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
