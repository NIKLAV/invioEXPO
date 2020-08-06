import React from "react";

import { StyleSheet, View, Text } from "react-native";

const Balance = ({ value, name }) => {
  return name === "" ? (
    <View style={styles.balance}>
      <Text style={styles.balance__num}>$ {value}</Text>
    </View>
  ) : (
    <View style={styles.balance}>
      <Text style={styles.balance__num}>{value}</Text>
      <Text style={styles.balance__usd}>{name.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  balance: {
    position: "relative",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "#fff",
  },
  balance__num: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    paddingHorizontal: 12,
  },
  balance__usd: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Balance;
