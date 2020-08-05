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
import { NothingToShow } from "../common/NothingToShow/NothingToShow";
import TabBar from "../common/TabBar/TabBar";

const DepositWithdrawHistory = ({ navigation, touched, setTouched }) => {
  console.log("render History");
  const dispatch = useDispatch();
  const page = useSelector((state) => state.historyPage.page);
  const lastPage = useSelector((state) => state.historyPage.lastPage);
  const loading = useSelector((state) => state.historyPage.loading);
  /* const [history, setHistory] = useState([]); */
  const history = useSelector((state) => state.historyPage.data);

  useEffect(() => {
    dispatch(fetchHistory(page));
  }, [page]);

  console.log('page in depositwithdraw', page)

  console.log("history", history);
  const onList = () => {
    console.log("pageonList", page, "lastPageonList", lastPage);
    if (page < lastPage) {
      dispatch({ type: "NEXT_PAGE_HISTORY" });
    }
  };

  const renderAccordians = (history) => {
    const items = [];
    let i = 1;
    for (let item of history) {
      items.push(
        <Accordian
          key={item.created_at + Math.random()}
          title={item.created_at}
          amount={item.amount}
          type={item.transaction_type}
          coin={item.asset_code}
          list={
            <View key={item.created_at} style={styles.child}>
              {/* <View style={styles.child__item}>
                <View style={styles.test}>
                  <Text style={styles.child__item__text}>Date/Time</Text>
                </View>
                <Text style={styles.child__item__value}>{item.created_at}</Text>
              </View> */}
              {/*   <View style={styles.child__item}>
                <View style={styles.test}>
                  <Text style={styles.child__item__text}>Coin</Text>
                </View>
                <Text
                  style={[
                    styles.child__item__value,
                    { textTransform: "uppercase" },
                  ]}
                >
                  {item.asset_code}
                </Text>
              </View> */}
              <View style={styles.child__item}>
                <View style={styles.test}>
                  <Text style={styles.child__item__text}>Amount</Text>
                </View>
                <Text style={styles.child__item__value}>
                  {Number(item.amount).toFixed(8)}
                </Text>
              </View>
              <View style={styles.child__item}>
                <View style={styles.test}>
                  <Text style={styles.child__item__text}>Fee</Text>
                </View>
                <Text style={styles.child__item__value}>
                  {Number(item.fee).toFixed(8)}
                </Text>
              </View>
              <View style={styles.child__item}>
                <View style={styles.test}>
                  <Text style={styles.child__item__text}>Wallet address</Text>
                </View>
                <Text style={styles.child__item__value}>{item.address}</Text>
              </View>
              <View style={styles.child__item}>
                <View style={styles.test}>
                  <Text style={styles.child__item__text}>Type</Text>
                </View>
                <Text style={styles.child__item__value}>
                  {item.transaction_type}
                </Text>
              </View>
              <View style={styles.child__item}>
                <View style={styles.test}>
                  <Text style={styles.child__item__text}>Status</Text>
                </View>
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
      {!loading && history.length === 0 ? (
        <NothingToShow
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ) : !loading && history && history.length > 0 ? (
        <View>
          <ImageBackground
            resizeMode="cover"
            source={require("../../assets/images/transactions/back.png")}
            style={styles.container}
          >
            <Header onPress={() => navigation.openDrawer()}>
              DEPOSIT/WITHDRAW HISTORY
            </Header>
            <TabBar touched={touched} setTouched={setTouched} navigation={navigation} />
            {!loading && history.length > 0 ? (
              <View style={styles.accordionContainer}>
                {renderAccordians(history)}
                {page < lastPage && (
                  <View style={{ marginTop: 55 }}>
                    <CustomButton onPress={() => onList()}>
                      loading more
                    </CustomButton>
                  </View>
                )}
                {loading ? <Preloader /> : null}
              </View>
            ) : null}
            <Footer />
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
    /* flex: 1, */
    /* height: windowHeight, */
    width: "100%",
    justifyContent: "space-between",
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
    paddingTop: 100,
    paddingBottom: 100,
    marginTop: 100,
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
});

export default DepositWithdrawHistory;
