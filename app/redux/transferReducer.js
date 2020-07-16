const initialState = {
  data: [],
  update: null,
};

const transferReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_TRANSFER":
      return { ...state, data: action.payload};
    case "ADD_NEW_TRANSFER":
      return {
        ...state,
        data: [...state.data, action.payload],
        update: 1
      };
    default:
      return state;
  }
};

export default transferReducer;
