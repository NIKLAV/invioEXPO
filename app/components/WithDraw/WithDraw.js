import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomButton from '../common/Button/CustomButton';
import Footer from '../common/Footer/Footer';
import Header from '../common/Header/Header';
import Balance from '../common/Balance/Balance';
import CustomModal from '../common/Modal/Modal';
import useForm from '../../hooks/useForm';
import {useDispatch, useSelector} from 'react-redux';
import {sendCurrency} from '../../redux/actions';
import useFetch from '../../hooks/useFetch';
import AsyncStorage from '@react-native-community/async-storage';
import {windowHeight} from '../../utilts/windowHeight';

const WithDraw = ({navigation, route}) => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  /*   const [{isLoading, response, errors}, doFetch] = useFetch(
    'user/wallets/withdrawals/create',
  ); */
  /*  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    doFetch({
      method: 'post',
      headers: {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      },
      wallet_id: data.walletId,
      asset_id: data.assetId,
      amount,
      address,
    });
  }; */

  const dispatch = useDispatch();

  const onPress = () => {
    if (amount.length === 0 || address.length === 0) {
      dispatch({type: 'ADD_ERROR_LENGTH'});
    } else if (amount > data.value) {
      dispatch({type: 'ADD_ERROR_AMOUNT'});
    } else dispatch(sendCurrency(data.walletId, data.assetId, amount, address));
  };

  const errors = useSelector(state => state.withDrawPage.errorMessages);
  useEffect(() => {
    
    if (Array.isArray(errors) && errors.includes('Successfully!') ) {
      setAddress('');
      setAmount('');
    }
  }, [errors]);

  const clearErrorMessage = () => {
    dispatch({type: 'CLEAR_ERROR_DRAW'});
  };

  const data = route.params.params;

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={'height'}
        keyboardVerticalOffset="-160">
        {/* чтобы клавиатура не закрывала инпут отрицательное значение */}
        <ImageBackground
          source={require('../../assets/bg.png')}
          style={styles.container}
          resizeMode="cover">
          <Header onPress={() => navigation.openDrawer()}>WITHDRAW</Header>
          <View style={{alignItems: 'center', marginTop: 40}}>
            <Text style={styles.logo__text}>Availible balance:</Text>
          </View>

          <Balance name={data.name} value={data.value} />

          <View style={styles.inputs}>
            {errors ? (
              <CustomModal
                errors={errors}
                clearErrorMessage={clearErrorMessage}
              />
            ) : null}
            <View style={styles.inputs__container}>
              <View style={styles.input__container}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  onChangeText={address => setAddress(address)}
                  value={address}
                  style={styles.input}
                />
              </View>
              <View style={styles.input__container}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  onChangeText={amount => setAmount(amount)}
                  value={amount}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.button__container}>
              <CustomButton onPress={onPress}>Withdraw</CustomButton>
            </View>
          </View>
        </ImageBackground>
        <Footer />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: windowHeight,
  },
  logo: {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo__text: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
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
    /*   position: 'absolute',
    right: 0, */
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  inputs: {
    flex: 1,
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  input: {
    width: 280,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inputs__container: {
    marginTop: 32,
  },
  input__container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: '#38383b',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button__container: {
    marginTop: 35,
    marginBottom: 100,
  },
});

export default WithDraw;
