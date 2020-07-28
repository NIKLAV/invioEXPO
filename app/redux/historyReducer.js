const initialState = {
  data: [],
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_HISTORY":
      return { ...state, data: action.payload };

    case "ADD_NEW_HISTORY":
      return { ...state, data: [...state.data, action.payload] };
    default:
      return state;
  }
};

export default historyReducer;
