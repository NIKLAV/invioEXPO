import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export const fetchWallets = () => async (dispatch) => {
  dispatch({ type: "LOADING_WALLETS" });
  const token = await AsyncStorage.getItem("token");
  const response = await axios
    .get("http://185.181.8.210:8901/api/user/wallets", {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
      platform: "android",
      device_type: "mobile",
      captcha: "kQuA2nRYJ4R7jQVDpCVmk696SYnkV3y7",
    })
    .catch((err) => console.log("error in wallets", err));
  console.log("response fetchWallets", response.data);
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
    address: address,
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
/*   let i = 1;
  if (page === i) {
    dispatch({ type: "CLEAR_HISTORY" });
  } else i++ */
  

  dispatch({ type: "LOADING_HISTORY" });
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get(
    `http://185.181.8.210:8901/api/user/wallets/history?current_page=${page}&per_page=8`,
    {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  console.log("response history", response);
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
  /* dispatch({ type: "CLEAR_TRANSACTIONS" }); */

  dispatch({ type: "LOADING_TRANSFER" });
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get(
    `http://185.181.8.210:8901/api/user/wallets/transfers?current_page=${page}&per_page=3`,
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


export const fetchTrades = (page) => async (dispatch) => {
  /* dispatch({ type: "CLEAR_TRANSACTIONS" }); */

  dispatch({ type: "LOADING_TRADES" });
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get(
    `http://185.181.8.210:8901/api/user/trading/closed_trades?current_page=${page}&per_page=10`,
    {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  const concatArray = [...response.data.buy.data, ...response.data.sell.data]
  console.log('concatArrat', concatArray)
  dispatch({ type: "LOADING_TRADES_SUCCESS" });
  console.log("response trades", response /* response.data.buy.data, response.data.sell.data */);
  dispatch({
    type: "FETCH_BUY_TRADES",
    payload: {
      buy: response.data.buy.data,
      sell:response.data.sell.data,
      lastPageBuy: response.data.buy.last_page,
      lastPageSell: response.data.sell.last_page,
    },
  });
};
