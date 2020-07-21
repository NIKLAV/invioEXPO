import React, { useEffect } from "react";
import Header from "../common/Header/Header";
import {
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import Footer from "../common/Footer/Footer";
import Accordian from "../common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../redux/actions";
import Preloader from "../common/Preloader/preloader";

const History = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHistory());
  }, []);

  const history = useSelector((state) => state.historyPage.data.transactions);

  const renderAccordians = () => {
    const items = [];

    let i = 1;

    for (let item of history.data) {
      console.log("item amount", item.amount);
      items.push(
        <Accordian
          key={item.created_at}
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
      {history && history.data.length >= 1 ? (
        <ImageBackground
          resizeMode="cover"
          source={require("../../assets/images/transactions/back.png")}
          style={styles.container}
        >
          <Header onPress={() => navigation.openDrawer()}>HISTORY</Header>
          {history ? (
            <View style={styles.accordionContainer}>{renderAccordians()}</View>
          ) : null}
          <Footer />
        </ImageBackground>
      ) : (
        <Preloader />
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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e1e1e1",
    width: "100%",
  },
  child__item__text: {
    paddingLeft: 8,
    height: 45,
    width: "40%",
    backgroundColor: "#f4f4f4",
    textAlignVertical: "center",
  },
  child__item__value: {
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
});

export default History;
