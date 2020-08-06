import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const CustomButtonOpacity = ({children = '', onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.2}>
      <Text style={styles.button__text}>{children}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 280,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#88888b',
    borderTopColor: '#88888b',
    borderLeftColor: '#88888b',
    borderRightColor: '#88888b',

  },
  button__text: {
    color: '#88888b',
    fontSize: 16,
  },
});

export default CustomButtonOpacity;
