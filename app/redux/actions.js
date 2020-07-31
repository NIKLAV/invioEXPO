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

export const sendCurrency = (
  walletId,
  assetId,
  amount,
  address,
  page
) => async (dispatch) => {
  console.log("amoun in reducer", amount);
  const bd = {
    wallet_id: walletId,
    asset_id: assetId,
    amount: amount,
    address: "0x68F69D2E85Df0fA1cb80664585A435C7B2E1683d",
  };
  dispatch({ type: "CURRENT_PAGE_ONE_HISTORY" });

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
        dispatch({ type: "CLEAR_HISTORY" });
        dispatch({ type: "SEND_CURRENCY" });
        if (page === 1) {
          dispatch(fetchHistory(1));
        }

        /* dispatch(fetchHistory(1)); */
        dispatch(fetchWallets());
      }
    });
};

export const generateAddress = (name) => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(
    `http://185.181.8.210:8901/api/user/wallets/generate_address?asset_code=${name}`,
    {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  );

  dispatch({
    type: "GENERATE_ADDRESS",
    payload: response.data,
  });
};

export const fetchHistory = (page) => async (dispatch) => {
  
  dispatch({ type: "LOADING_HISTORY" });
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get(
    `http://185.181.8.210:8901/api/user/wallets/history?current_page=${page}&per_page=15`,
    {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  console.log('response history', response)
  dispatch({ type: "LOADING_SUCCESS" });
  console.log("history response", response.data.transactions.lastPage);
  dispatch({
    type: "FETCH_ALL_HISTORY",
    payload: {
      data: response.data.transactions.data,
      lastPage: response.data.transactions.last_page,
    },
  });
};

export const fetchTransfer = (page) => async (dispatch) => {
  dispatch({ type: "LOADING_TRANSFER" });
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get(
    `http://185.181.8.210:8901/api/user/wallets/transfers?current_page=${page}&per_page=15`,
    {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  dispatch({ type: "LOADING_TRANSFER_SUCCESS" });
  console.log("response transfer", response);
  dispatch({
    type: "FETCH_ALL_TRANSFER",
    payload: {
      data: response.data.transfers.data,
      lastPage: response.data.transfers.last_page,
    },
  });
};

export const sendSEND = (assetId, amount, name, page) => async (dispatch) => {
  console.log("page on action", page);
  dispatch({ type: "CURRENT_PAGE_ONE" });
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
      if (response.errors) {
        dispatch({ type: "ADD_ERROR_SEND", payload: response.errors });
      } else {
        dispatch({ type: "CLEAR_TRANSACTIONS" });
        dispatch({ type: "SEND_SEND" });
        if (page === 1) {
          dispatch(fetchTransfer(1));
        }
        dispatch(fetchWallets());
      }
    });
};
