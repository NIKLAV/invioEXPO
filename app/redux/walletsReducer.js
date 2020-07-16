const initialState = {
  errorMessagesWallet: '',
};

const walletsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_WALLETS':
      return {...state, data: action.payload};
    case 'ERROR_WALLETS':
      return {
        ...state,
        errorMessagesWallet: [
          ...state.errorMessagesWallet,
          'Select currency first',
        ],
      };
    case 'CLEAR_ERROR_WALLETS':
      return {
        ...state,
        errorMessagesWallet: '',
      };
    default:
      return state;
  }
};

export default walletsReducer;
