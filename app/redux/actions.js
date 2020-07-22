import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export const fetchWallets = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(
    "http://185.181.8.210:8901/api/user/wallets",
    {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
      platform: "android",
      device_type: "mobile",
      captcha: "kQuA2nRYJ4R7jQVDpCVmk696SYnkV3y7",
    }
  );
  dispatch({
    type: "LOAD_WALLETS",
    payload: response.data,
  });
};
/////////////////////////////////////////

export const sendCurrency = (walletId, assetId, amount, address) => async (
  dispatch
) => {
  const bd = {
    wallet_id: walletId,
    asset_id: assetId,
    amount: amount,
    address: '0x68F69D2E85Df0fA1cb80664585A435C7B2E1683d',
  };

  const token = await AsyncStorage.getItem("token");

  fetch("http://185.181.8.210:8901/api/user/wallets/withdrawals/create", {
    method: "POST",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bd),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.errors) {
        dispatch({ type: "ADD_ERROR_DRAW", payload: response.errors });
      } else {
        const { fee, status, created_at, asset_code } = response;
        console.log(fee, status, created_at, asset_code);
        dispatch({ type: "SEND_CURRENCY" });
        dispatch(fetchHistory());
        dispatch(fetchWallets());
      }
    });
};

export const generateAddress = (name) => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios
    .get(
      `http://185.181.8.210:8901/api/user/wallets/generate_address?asset_code=${name}`,
      {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      }
    )
    .then(console.warn(response));

  dispatch({
    type: "GENERATE_ADDRESS",
    payload: response.data,
  });
};

export const fetchHistory = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get(
    "http://185.181.8.210:8901/api/user/wallets/history",
    {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  );

  dispatch({
    type: "FETCH_ALL_HISTORY",
    payload: response.data,
  });
};

export const fetchTransfer = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get(
    "http://185.181.8.210:8901/api/user/wallets/transfers",
    {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  console.warn("action 106");
  dispatch({
    type: "FETCH_ALL_TRANSFER",
    payload: response.data,
  });
};

export const sendSEND = (assetId, amount, name) => async (dispatch) => {
  const bd = {
    asset_id: assetId,
    amount: amount,
    username: name,
  };

  const token = await AsyncStorage.getItem("token");

  fetch("http://185.181.8.210:8901/api/user/wallets/transfers", {
    method: "POST",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bd),
  })
    .then((response) => response.json())
    .then((response) => {
      console.warn("response 132", response);
      if (response.errors) {
        dispatch({ type: "ADD_ERROR_SEND", payload: response.errors });
      } else {
        dispatch({ type: "SEND_SEND" });
        dispatch(fetchTransfer());
        dispatch(fetchWallets());
      }
    });
};
