const initialState = {
  buy: [],
  sell: [],
  page: 1,
  lastPageBuy: 1,
  lastPageSell: 1,
  loading: false,
};

const tradesReducer = (state = initialState, action) => {
  console.log("state", state);
  switch (action.type) {
    case "FETCH_BUY_TRADES":
      return {
        ...state,
        lastPageBuy: action.payload.lastPageBuy,
        buy: [...state.buy, ...action.payload.buy],
        lastPageSell: action.payload.lastPageSell,
        sell: [...state.sell, ...action.payload.sell],
      };
    case "CLEAR_TRADES":
      return { ...state, data: [] };
    case "NEXT_PAGE_TRADE":
      return { ...state, page: state.page + 1 };
    case "CURRENT_PAGE_ONE":
      return { ...state, page: 1, data: [] };
    case "LOADING_TRADES":
      return { ...state, loading: true };
    case "LOADING_TRADES_SUCCESS":
      return { ...state, loading: false };
    case "LOGOUT_TRADES":
      return { ...state, page: 1, data: [] };
    default:
      return state;
  }
};

export default tradesReducer;
