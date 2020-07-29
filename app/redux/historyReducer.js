const initialState = {
  data: [],
  loading: false,
  page: 1,
  lastPage: 1,
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_HISTORY":
      console.log("state", state);
      return {
        ...state,
        lastPage: action.payload.lastPage,
        data: [...new Set([...state.data, ...action.payload.data])],
      };
    case "CLEAR_HISTORY":
      return { ...state, data: [] };
    case "LOADING_HISTORY":
      return { ...state, loading: true };
    case "LOADING_SUCCESS":
      return { ...state, loading: false };
    case "NEXT_PAGE_HISTORY":
      return { ...state, page: state.page + 1 };
    case "CURRENT_PAGE_ONE_HISTORY":
      return { ...state, page: 1 };
    case "LOGOUT_HISTORY":
      return {...state, page: 1, data: []}  
    default:
      return state;
  }
};

export default historyReducer;
