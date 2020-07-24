const initialState = {
  errorMessagesWallet: "",
  currencyData: {},
};

const walletsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_WALLETS":
      return { ...state, data: action.payload };
    case "ERROR_WALLETS":
      return {
        ...state,
        errorMessagesWallet: [
          ...state.errorMessagesWallet,
          "Select currency first",
        ],
      };
    case "CLEAR_ERROR_WALLETS":
      return {
        ...state,
        errorMessagesWallet: "",
      };
    case "ERROR_WALLETS_NOTVEFIFIED":
      return {
        ...state,
        errorMessagesWallet: [
          ...state.errorMessagesWallet,
          "Please, verify your account. You can do it in the Settings menu - Account verification",
        ],
      };
      case "ERROR_WALLETS_PENDING":
      return {
        ...state,
        errorMessagesWallet: [
          ...state.errorMessagesWallet,
          "Pending Your account wasn't verified yet. Please, contact our support if you have any questions",
        ],
      };
      case "ERROR_WALLETS_BAN":
        return {
          ...state,
          errorMessagesWallet: [
            ...state.errorMessagesWallet,
            "This function was banned for you. Please contact our support team.",
          ],
        };
        case 'SEND_PARAMS_ON_DEPOSIT_OR_WITHDRAW':
          console.log(state)
          return {
            ...state,
            currencyData: action.payload 
          }
    default:
      return state;
  }
};

export default walletsReducer;
