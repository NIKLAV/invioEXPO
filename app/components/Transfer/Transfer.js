import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {fetchTransfer} from '../../redux/actions';
import Preloader from '../common/Preloader/preloader';
import {windowHeight} from '../../utilts/windowHeight';

const Transfer = ({navigation}) => {
  function checkCoin(q) {
    switch (q) {
      case 3:
        return 'usdt';
      case 4:
        return 'usdc';
      case 5:
        return 'dai';
      case 6:
        return 'pax';
      default:
        q;
    }
  }
 const checkForUpdate = useSelector(state => state.transferPage.update)
 console.log('check for update', checkForUpdate)
  const dispatch = useDispatch();
  useEffect(() => {
    console.warn('effect transfer')
    dispatch(fetchTransfer());
  }, [dispatch]);

  const transfer = useSelector(state => state.transferPage.data.transfers);
  console.log(transfer);
  const amount = 23.1234567890
  const renderAccordians = () => {
    const items = [];
    console.warn(items);
    let i = 1;
    console.warn(i);
    for (let item of transfer.data) {
      items.push(
        <Accordian
          title={item.created_at}
          list={
            <View key={item.created_at} style={styles.child}>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Date/Time</Text>
                <Text style={styles.child__item__value}>{item.created_at}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Coin</Text>
                <Text style={styles.child__item__value}>
                  {checkCoin(item.asset_id)}
                </Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Amount</Text>
                <Text style={styles.child__item__value}>{item.amount}</Text>
              </View>
              <View style={styles.child__item}>
                <Text style={styles.child__item__text}>Send</Text>
                <Text style={styles.child__item__value}>{item.to_user}</Text>
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
      {transfer ? (
        <View>
          <ImageBackground
            resizeMode="cover"
            source={require('../../assets/images/transactions/back.png')}
            style={styles.container}>
            <Header onPress={() => navigation.openDrawer()}>TRANSFER</Header>
            {transfer ? (
              <View style={styles.accordionContainer}>
                {renderAccordians()}
              </View>
            ) : null}
          </ImageBackground>
          <Footer />
        </View>
      ) : (
        <Preloader />
      )}
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
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
  child__item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e1e1e1',
    width: '100%',
  },
  child__item__text: {
    paddingLeft: 8,
    height: 45,
    width: '40%',
    backgroundColor: '#f4f4f4',
    textAlignVertical: 'center',
  },
  child__item__value: {
    paddingLeft: 8,
    height: 45,
    width: '60%',
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

export default Transfer;
