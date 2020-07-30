import React, { useEffect, useState } from "react";
import Header from "../common/Header/Header";
import {
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Footer from "../common/Footer/Footer";
import Accordian from "../common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../redux/actions";
import { Preloader, Spiner } from "../common/Preloader/preloader";
import { windowHeight } from "../../utilts/windowHeight";
import CustomButton from "../common/Button/CustomButton";

const History = ({ navigation }) => {
  console.log('render History')
  const dispatch = useDispatch();
  const page = useSelector((state) => state.historyPage.page);
  const lastPage = useSelector((state) => state.historyPage.lastPage);
  const loading = useSelector((state) => state.historyPage.loading);

  useEffect(() => {
    dispatch(fetchHistory(page));
  }, [page]);

  const history = useSelector((state) => state.historyPage.data);
  console.log("history", history);
  const onList = () => {
    console.log("pageonList", page, "lastPageonList", lastPage);
    if (page < lastPage) {
      dispatch({ type: "NEXT_PAGE_HISTORY" });
    }
  };

  const renderAccordians = () => {
    const items = [];
    let i = 1;
    for (let item of history) {
      items.push(
        <Accordian
          key={item.created_at + Math.random()}
          title={item.created_at}
          list={
            <View key={item.created_at} style={styles.child}>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Date/Time</Text>
                <Text style={styles.child__item__value}>{item.created_at}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Coin</Text>
                <Text style={styles.child__item__value}>{item.asset_code}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Amount</Text>
                <Text style={styles.child__item__value}>{item.amount}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Fee</Text>
                <Text style={styles.child__item__value}>{item.fee}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>WalletAddress</Text>
                <Text style={styles.child__item__value}>{item.address}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Type</Text>
                <Text style={styles.child__item__value}>
                  {item.transaction_type}
                </Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Status</Text>
                <Text style={styles.child__item__value}>{item.status}</Text>
              </View>
            </View>
          }
        />
      );
      i++;
    }
    return items;
  };

  return (
    <ScrollView>
      {history && history.length > 0 ? (
        <View>
          <ImageBackground
            resizeMode="cover"
            source={require("../../assets/images/transactions/back.png")}
            style={styles.container}
          >
            <Header onPress={() => navigation.openDrawer()}>HISTORY</Header>
            {history ? (
              <View style={styles.accordionContainer}>
                {renderAccordians()}
                <View style={{marginTop: 55}}>
                  <CustomButton onPress={() => onList()}>
                    loading more
                  </CustomButton>
                </View>
                {loading ? <Preloader /> : null}
              </View>
            ) : null}
          </ImageBackground>
          <Footer />
        </View>
      ) : (
        <Spiner />
      )}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 8,
    height: 45,
    width: "40%",
    backgroundColor: "#f4f4f4",
    textAlignVertical: "center",
    borderBottomWidth: 1,
    borderColor: "#e1e1e1",
  },
  child__item__value: {
    /* height: 45, */
    paddingLeft: 8,
    width: "60%",
    backgroundColor: "#fff",
    textAlignVertical: "center",
  },
  accordionContainer: {
    paddingTop: 50,
    paddingBottom: 100,
    marginTop: 75,
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
});

export default History;
