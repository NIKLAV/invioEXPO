import createDataContext from "./createDataContext";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SIGNIN":
      return {
        errorMessage: "",
        token: action.payload.bearer_token,
        username: action.payload.user.username,
      };
    case "CLEAR_ERROR":
      return { ...state, errorMessage: "" };
    case "SIGNOUT":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const signin = (dispatch) => async ({ login, password, totp }) => {
  try {
    const response = await axios.post("http://185.181.8.210:8901/api/login", {
      email: login,
      password,
      platform: "android",
      device_type: "mobile",
      captcha: "kQuA2nRYJ4R7jQVDpCVmk696SYnkV3y7",
      totp: totp,
    });

    await AsyncStorage.setItem("token", response.data.bearer_token);
    await AsyncStorage.setItem("name", response.data.user.username);
    /* await AsyncStorage.setItem("kyc", response.data.user.kyc_status);
    await AsyncStorage.setItem(
      "banDraw",
      String(response.data.user.ban_withdraw)
    );
    await AsyncStorage.setItem(
      "banDeposit",
      String(response.data.user.ban_deposit)
    );
    await AsyncStorage.setItem(
      "banTransfer",
      String(response.data.user.ban_transfer)
    ); */

    dispatch({ type: "SIGNIN", payload: response.data });
  } catch (err) {
    let message = err.response.data.errors;
    dispatch({ type: "ADD_ERROR", payload: message });
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "CLEAR_ERROR" });
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  /* await AsyncStorage.removeItem("kyc");
  await AsyncStorage.removeItem("banDraw");
  await AsyncStorage.removeItem("banDeposit");
  await AsyncStorage.removeItem("banTransfer"); */

  dispatch({ type: "SIGNOUT" });
};

export const { Provider, Context } = createDataContext(
  authReducer,

  { signin, clearErrorMessage, signout },
  { token: null, errorMessage: "", username: "" }
);
