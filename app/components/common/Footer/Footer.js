import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {windowHeight} from '../../../utilts/windowHeight';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Image source={require('../../../assets/images/login/logo_footer.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 80,
  },
});

export default Footer;
