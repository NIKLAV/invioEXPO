import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const BoxItem = ({ onPress, balance, code, touched, setTouched }) => {

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        setTouched(code);
      }}
      on
      style={[styles.box__item,  touched === code ? styles.box__itemTouched : null ]}
    >
      <Text style={styles.box__itemText}>{code}</Text>

      <Text style={styles.box__itemText}>{balance}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    textTransform: "uppercase",
  },
});

export default BoxItem;

{
  /* <View key={item.id} style={[styles.box__item]}>
                  <Text
                    onPress={() => {
                      setNameCurrency({
                        name: item.currency.code,
                        value: item.balance,
                        assetId: item.currency_id,
                        walletId: item.id,
                      });
                      setTouched(true);
                    }}
                    style={styles.box__itemText}>
                    {item.currency.code}
                  </Text>

                  <Text style={styles.box__itemText}>
                    {item.balance.toFixed(2)}
                  </Text>
                </View> */
}
