import T from "i18n-react";
const initialState = {
  data: [],
  errorMessagesSend: "",
};

const sendReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_SEND":
      return {
        ...state,
        errorMessagesSend: [
          ...state.errorMessagesSend,
          `${T.translate("t_0065")} ${action.payload.amount} ${
            action.payload.currencyCode
          } ${T.translate("t_0066")} @${action.payload.username} ${T.translate(
            "t_0067"
          )}`,
        ],
      };
    case "ADD_ERROR_SEND":
      return { ...state, errorMessagesSend: action.payload };
    case "ADD_ERROR_LENGTH_SEND":
      return {
        ...state,
        errorMessagesSend: [...state.errorMessagesSend, T.translate("t_0068")],
      };
    case "ADD_ERROR_AMOUNT_SEND":
      return {
        ...state,
        errorMessagesSend: [
          ...state.errorMessagesSend,
          T.translate("t_0069"),
        ],
      };
    case "CLEAR_ERROR_SEND":
      return {
        ...state,
        errorMessagesSend: "",
      };
    default:
      return state;
  }
};

export default sendReducer;
