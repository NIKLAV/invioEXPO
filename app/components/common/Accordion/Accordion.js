import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Accordian = ({ title, list, amount, type, coin }) => {
  const [expand, setExpand] = useState(false);
  const arrowTop = require("../../../assets/images/deposit_withdraw/arrowTop.png");
  const arrowBot = require("../../../assets/images/deposit_withdraw/arrowBot.png");

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpand(!expand);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={expand ? styles.blackRow : styles.grayRow}
        onPress={() => toggleExpand()}
      >
        <View style={styles.itemContainer}>
          {type.includes("deposit") ? (
            <Text style={[styles.title, styles.deposit]}>
              +{amount}{' '}
              {coin.toUpperCase()}
            </Text>
          ) : (
            <Text style={[styles.title, styles.withdraw]}>
              -{amount} {' '}
              {coin.toUpperCase()}
            </Text>
          )}
          <Text style={[styles.title, styles.font]}>{title}</Text>
        </View>
        {expand ? <Image source={arrowTop} /> : <Image source={arrowBot} />}
      </TouchableOpacity>
      <View style={styles.parentHr} />

      {expand && <ScrollView>{list}</ScrollView>}
    </View>
  );
};

export default Accordian;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
  },
  title: {
    fontSize: 17,
    fontWeight: "300",
    color: "#fff",
  },
  grayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 56,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    backgroundColor: "#515151",
  },
  blackRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 56,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    backgroundColor: "#000",
  },
  parentHr: {
    height: 1,
    color: "#fff",
    width: "100%",
  },
  itemContainer: {
    display: "flex",
    justifyContent: "flex-start",
   /*  alignItems: "center", */
  },
  deposit: {
    color: '#36b526',
    fontWeight: 'bold',
  },
  withdraw: {
    color: '#dd4444',
    fontWeight: 'bold',
  }
});
