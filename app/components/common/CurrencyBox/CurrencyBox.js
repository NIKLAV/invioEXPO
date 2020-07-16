import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from 'react-native';

const CurrencyBox = ({
  paginate,
  currentPage,
  lastPage,
  onPressText,
  summ,
  currentPosts,
}) => {
  return (
    <>
      <View style={styles.box}>
        <FlatList
          data={currentPosts}
          renderItem={({item}) => (
            <View key={item.id} style={[styles.box__item]}>
              <Text onPress={onPressText} style={styles.box__itemText}>
                {item.name}
              </Text>
              {/* захаркодженые данные*/}
              <Text style={styles.box__itemText}>{item.value}</Text>
            </View>
          )}
        />
        <View style={styles.box__footer}>
          <Text style={styles.box__footerText}>Total Balance = </Text>
          <Text style={styles.box__footerText}>{summ}</Text>
        </View>
      </View>
      <View style={styles.switchContainer}>
        <TouchableWithoutFeedback
          disabled={currentPage === 1}
          onPress={() => paginate(--currentPage)}>
          <View
            style={[
              styles.switchLeft,
              currentPage === 1 ? styles.disabledSwitcher : null,
            ]}>
            <Image
              style={styles.arrowRight}
              source={require('../../../assets/images/wallets/arrowLeft.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          disabled={currentPage === lastPage}
          onPress={() => paginate(++currentPage)}>
          <View
            style={[
              styles.switchRight,
              currentPage === lastPage ? styles.disabledSwitcher : null,
            ]}>
            <Image
              style={styles.arrowRight}
              source={require('../../../assets/images/wallets/arrowRight.png')}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default CurrencyBox;

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    height: 170,
    minWidth: 252,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1b',
    borderRadius: 10,
  },
  box__item: {
    paddingVertical: 8,
    paddingLeft: 20,
    paddingRight: 20,
    width: 252,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box__itemTouched: {
    backgroundColor: '#a4a5a7',
  },
  box__itemText: {
    color: '#fff',
  },
  box__footer: {
    width: 252,
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#000',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  box__footerText: {
    paddingLeft: 20,
    paddingRight: 20,
    color: '#fff',
    fontSize: 15,
  },
  switchContainer: {
    marginVertical: 16,
    flex: 1,
    flexDirection: 'row',
  },
  switchLeft: {
    height: 32,
    width: 52,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  switchRight: {
    height: 32,
    width: 52,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  disabledSwitcher: {
    backgroundColor: '#b8b8b8',
  },
});
