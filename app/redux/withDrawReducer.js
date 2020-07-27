const initialState = {
  errorMessages: "",
  data: [],
};

const withDrawReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_CURRENCY":
      return {
        ...state,
        errorMessages: [...state.errorMessages, "Successfully!"],
      };
    case "ADD_ERROR_DRAW":
      return { ...state, errorMessages: action.payload };
    case "CLEAR_ERROR_DRAW":
      return { ...state, errorMessages: "" };
    case "ADD_ERROR_AMOUNT":
      return {
        ...state,
        errorMessages: [...state.errorMessages, "Not enough money"],
      };
    case "ADD_ERROR_LENGTH":
      return {
        ...state,
        errorMessages: [...state.errorMessages, "Please fill all fields"],
      };
    case "ADD_ERROR_MIN_AMOUNT":
      return {
        ...state,
        errorMessages: [
          ...state.errorMessages,
          `Pay attention! The minimum amount for withdrawal is ${action.payload.min} ${action.payload.code}`,
        ],
      };
    case "ADD_ERROR_MAX_DAY":
      return {
        ...state,
        errorMessages: [
          ...state.errorMessages,
          `Daily withdrawal limit exceeded`,
        ],
      };
    case "ADD_ERROR_AMOUNT_MAX":
      return {
        ...state,
        errorMessages: [
          ...state.errorMessages,
          `Pay attention! The maximum amount for withdrawal is ${action.payload.max} ${action.payload.code}`,
        ],
      };
    default:
      return state;
  }
};

export default withDrawReducer;
