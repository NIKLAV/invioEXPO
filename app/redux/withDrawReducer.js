const initialState = {
  errorMessages: '',
  data: [],
};

const withDrawReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_CURRENCY':
      return {
        ...state,
        errorMessages: [...state.errorMessages, 'Successfully!'],
      };
    case 'ADD_ERROR_DRAW':
      return {...state, errorMessages: action.payload};
    case 'CLEAR_ERROR_DRAW':
      return {...state, errorMessages: ''};
    case 'ADD_ERROR_AMOUNT':
      return {
        ...state,
        errorMessages: [...state.errorMessages, 'Choose available amount'],
      };
    case 'ADD_ERROR_LENGTH':
      return {
        ...state,
        errorMessages: [
          ...state.errorMessages,
          'fill in the appropriate fields',
        ],
      };
    default:
      return state;
  }
};

export default withDrawReducer;
