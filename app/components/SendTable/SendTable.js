import React from 'react';
import Header from '../common/Header/Header';
import {
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Footer from '../common/Footer/Footer';
import Accordian from '../common/Accordion/Accordion';

const DATA = [
  {
    Data: '10.04.2020 15:41:09',
    Coin: 'USDT',
    Amount: '0.005731',
    Send: '@login.com',
  },
  {
    Data: '10.04.2020 15:41:29',
    Coin: 'USDT',
    Amount: '0.005731',
    Send: '@login.com',
  },
  {
    Data: '10.04.2020 15:41:19',
    Coin: 'USDT',
    Amount: '0.005731',
    Send: '@login.com',
  },
  {
    Data: '10.04.2020 15:41:24',
    Coin: 'USDT',
    Amount: '0.005731',
    Send: '@login.com',
  },
];

const SendTable = ({navigation}) => {
  const renderAccordians = () => {
    const items = [];
    console.warn(items);
    let i = 1;
    console.warn(i);
    for (let item of DATA) {
      items.push(
        <Accordian
          title={item.Data}
          list={
            <View key={item.Data} style={styles.child}>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Date/Time</Text>
                <Text style={styles.child__item__value}>{item.Data}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Coin</Text>
                <Text style={styles.child__item__value}>{item.Coin}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Amount</Text>
                <Text style={styles.child__item__value}>{item.Amount}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Send</Text>
                <Text style={styles.child__item__value}>{item.Send}</Text>
              </View>
            </View>
          }
        />,
      );
      i++;
    }
    return items;
  };

  return (
    <ScrollView>
      <ImageBackground
        resizeMode="cover"
        source={require('../../assets/images/transactions/back.png')}
        style={styles.container}>
        <Header onPress={() => navigation.openDrawer()}>SEND</Header>
        <View style={styles.accordionContainer}>{renderAccordians()}</View>
        <Footer />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  child: {
    width: 280,
    backgroundColor: '#fff',
    padding: 16,
  },
  child__item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e1e1e1',
  },
  child__item__text: {
    paddingLeft: 8,
    height: 35,
    width: 107,
    backgroundColor: '#f4f4f4',
    textAlignVertical: 'center',
  },
  child__item__value: {
    paddingLeft: 8,
    height: 35,
    width: 142,
    backgroundColor: '#fff',
    textAlignVertical: 'center',
  },
  accordionContainer: {
    paddingTop: 50,
    paddingBottom: 100,
    marginTop: 75,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
});

export default SendTable;
