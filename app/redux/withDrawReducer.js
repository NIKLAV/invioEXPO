import T from "i18n-react";
const initialState = {
  errorMessages: "",
  data: [],
};

const withDrawReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_CURRENCY":
      return {
        ...state,
        errorMessages: [...state.errorMessages, T.translate("t_0061")],
      };
    case "ADD_ERROR_DRAW":
      return { ...state, errorMessages: action.payload };
    case "CLEAR_ERROR_DRAW":
      return { ...state, errorMessages: "" };
    case "ADD_ERROR_AMOUNT":
      return {
        ...state,
        errorMessages: [...state.errorMessages, T.translate("t_0060")],
      };
    case "ADD_ERROR_LENGTH":
      return {
        ...state,
        errorMessages: [...state.errorMessages, T.translate("t_0058")],
      };
    case "ADD_ERROR_MIN_AMOUNT":
      return {
        ...state,
        errorMessages: [
          ...state.errorMessages,
          `${T.translate("t_0062")} ${action.payload.min} ${action.payload.code.toUpperCase()}`,
        ],
      };
    case "ADD_ERROR_MAX_DAY":
      return {
        ...state,
        errorMessages: [
          ...state.errorMessages,
          `${T.translate("t_0063")}`,
        ],
      };
    case "ADD_ERROR_AMOUNT_MAX":
      return {
        ...state,
        errorMessages: [
          ...state.errorMessages,
          `${T.translate("t_0064")} ${action.payload.max} ${action.payload.code.toUpperCase()}`,
        ],
      };
    default:
      return state;
  }
};

export default withDrawReducer;
