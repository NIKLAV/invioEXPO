import {useState, useEffect, useCallback, useContext} from 'react';
import axios from 'axios';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-community/async-storage';
import {Context as AuthContext} from '../context/AuthContext';

const useFetch = url => {
  const baseUrl = 'http://185.181.8.210:8901/api/';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const {state} = useContext(AuthContext);

  const doFetch = useCallback(
    (
      options = {
        platform: 'android',
        device_type: 'mobile',
        captcha: 'kQuA2nRYJ4R7jQVDpCVmk696SYnkV3y7',
      },
    ) => {
      setOptions(options);
      setIsLoading(true);
    },
    [],
  );

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: state.token ? `Bearer ${state.token}` : '',
        },
      },
    };
    if (!isLoading) {
      return;
    }

    axios(baseUrl + url, requestOptions)
      .then(res => {
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error.response.data);
      });
  }, [isLoading, options, url, state.token]);
  return [{isLoading, response, error}, doFetch];
};

export default useFetch;
