import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';

export default (key, initialValue = '') => {
  const [storageItem, setStorageItem] = useState(async () => {
    return (await AsyncStorage.getItem(key)) || initialValue;
  });

  useEffect(() => {
    AsyncStorage.setItem(key, storageItem);
  }, [storageItem, key]);

  async function getStorageItem() {
    const data = await AsyncStorage.getItem(key);
    setStorageItem(data);
  }

  function updateStorageItem(data) {
    if (typeof data === 'string') {
      AsyncStorage.setItem(key, data);
      setStorageItem(data);
    }
    return data;
  }

  function clearStorageItem() {
    AsyncStorage.removeItem(key);
    setStorageItem(null);
  }

  useEffect(() => {
    getStorageItem();
  }, []);

  return [storageItem, updateStorageItem, clearStorageItem, setStorageItem];
};
