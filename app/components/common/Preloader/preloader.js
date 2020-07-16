import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {windowHeight} from '../../../utilts/windowHeight';

const Preloader = () => {
  const center = windowHeight / 2 - 25;
  return (
    <View style={styles.container}>
      <View style={{marginTop: center}}>
        <ActivityIndicator size="large" color="#e0e0e0" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Preloader;
