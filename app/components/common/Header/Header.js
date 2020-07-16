import React from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const Header = ({children, onPress}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.test} onPress={onPress}>
        <Image
          style={styles.header__bar}
          source={require('../../../assets/bar.png')}
        />
      </TouchableOpacity>
      <Text style={styles.header__text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    minHeight: 50,
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },
  header__text: {
    marginTop: 30,
    fontSize: 15,
    color: '#fff',
    fontWeight: '300',
  },
  test: {
    position: 'absolute',
    left: 20,
    top: 25,
    zIndex: 100,
  },
});

export default Header;
