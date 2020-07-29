const initialState = {
  data: [],
  page: 1,
  lastPage: 1,
  loading: false,
};

const transferReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_TRANSFER":
      console.log("action.payload", action.payload);
      return {
        ...state,
        lastPage: action.payload.lastPage,
        data: [...new Set([...state.data, ...action.payload.data])],
      };
    case "CLEAR_TRANSACTIONS":
      return { ...state, data: [] };
    case "NEXT_PAGE":
      return { ...state, page: state.page + 1 };
    case "CURRENT_PAGE_ONE":
      return { ...state, page: 1 };
      case "LOADING_TRANSFER":
        return { ...state, loading: true };
      case "LOADING_TRANSFER_SUCCESS":
        return { ...state, loading: false };
        case "LOGOUT_TRANSFER":
      return {...state, page: 1, data: []} 
    default:
      return state;
  }
};

export default transferReducer;
