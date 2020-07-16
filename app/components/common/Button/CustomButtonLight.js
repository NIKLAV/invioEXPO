import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const CustomButtonLight = ({children = '', onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.8}>
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
    backgroundColor: '#525252',
  },
  button__text: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomButtonLight;
