const initialState = {
  data: [],
  errorMessagesSend: '',
};

const sendReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_SEND':
      return {
        ...state,
        errorMessagesSend: [...state.errorMessagesSend, 'Successfully!'],
      };
    case 'ADD_ERROR_SEND':
      return {...state, errorMessagesSend: action.payload};
    case 'ADD_ERROR_LENGTH_SEND':
      return {
        ...state,
        errorMessagesSend: [
          ...state.errorMessagesSend,
          'fill in the appropriate fields and choose currency',
        ],
      };
    case 'ADD_ERROR_AMOUNT_SEND':
      return {
        ...state,
        errorMessagesSend: [
          ...state.errorMessagesSend,
          'Need available amount',
        ],
      };
    case 'CLEAR_ERROR_SEND':
      return {
        ...state,
        errorMessagesSend: '',
      };
    default:
      return state;
  }
};

export default sendReducer;
