import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

const Balance = ({value, name}) => {
  return (
    <View style={styles.balance}>
      <Text style={styles.balance__num}>{value}</Text>
      <Text style={styles.balance__usd}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  balance: {
    position: 'relative',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#fff',
  },
  balance__num: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },
  balance__usd: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Balance;
