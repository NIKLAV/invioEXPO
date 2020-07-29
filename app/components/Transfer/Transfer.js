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
import Accordian from "../common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransfer } from "../../redux/actions";
import { Preloader, Spiner } from "../common/Preloader/preloader";
import CustomButton from "../common/Button/CustomButton";

const Transfer = ({ navigation }) => {
  console.log('render transfer')
  const page = useSelector((state) => state.transferPage.page);
  const lastPage = useSelector((state) => state.transferPage.lastPage);
  const loading = useSelector((state) => state.transferPage.loading);
  const [disableButton, setDisableButton] = useState(false)
  

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

  const renderAccordians = () => {
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
                <Text style={styles.child__item__text}>Date/Time</Text>
                <Text style={styles.child__item__value}>{item.created_at}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Coin</Text>
                <Text style={styles.child__item__value}>
                  {checkCoin(item.asset_id)}
                </Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Amount</Text>
                <Text style={styles.child__item__value}>{item.amount}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Send</Text>
                <Text style={styles.child__item__value}>{item.to_user}</Text>
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
      {transfer && transfer.length > 0 ? (
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
              TRANSFER
            </Header>
            {transfer ? (
              <View style={styles.accordionContainer}>
                {renderAccordians()}
                
                <View style={{ marginTop: 55 }}>
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
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    /* height: '100%', */
    /* height: windowHeight, */
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
    height: 45,
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

export default Transfer;
