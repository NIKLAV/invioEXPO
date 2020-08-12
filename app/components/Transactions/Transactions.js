import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Header from '../common/Header/Header';
import CustomButton from '../common/Button/CustomButton';
import Footer from '../common/Footer/Footer';
import CustomButtonLight from '../common/Button/CustomButtonLight';

const Transactions = ({navigation}) => {
  return (
    <ScrollView>
      <ImageBackground
        resizeMode="cover"
        source={require('../../assets/images/transactions/back.png')}
        style={styles.container}>
        <Header onPress={() => navigation.openDrawer()}>WALLET</Header>
        <View style={styles.logo}>
          <Text style={styles.logo__text}>Transactions</Text>
        </View>

        <View style={styles.buttons}>
          <View style={styles.button__container}>
            <CustomButtonLight>Deposit/Withdraw</CustomButtonLight>
          </View>
          <View style={styles.button__container}>
            <CustomButton>Send/Receive</CustomButton>
          </View>
        </View>

        <Footer />
      </ImageBackground>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 100,
  },
  logo__text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Montserrat',
    fontWeight: '300',
  },
  buttons: {
    width: '100%',
    paddingTop: 23,
    paddingBottom: 170,
    marginTop: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button__container: {
    marginVertical: 10,
  },
});

export default Transactions;
