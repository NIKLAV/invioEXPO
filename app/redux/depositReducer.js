const initialState = {
  data: [],
};

const depositReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GENERATE_ADDRESS':
      return {...state, data: action.payload};
    case 'CLEAR_ADDRESS':
      return {...state, data: []};
    default:
      return state;
  }
};

export default depositReducer;
