const initialState = {
  all: [],
  buy: [],
  sell: [],
  page: 1,
  lastPageBuy: 1,
  lastPageSell: 1,
  loading: false,
};

const tradesReducer = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case "FETCH_BUY_TRADES":
      return {
        ...state,
        all: [...state.all, ...action.payload.all],
        lastPageSell: action.payload.lastPageSell,
        lastPageBuy: action.payload.lastPageBuy,
        /* sell: [...state.sell, ...action.payload.sell], 
        buy: [...state.buy, ...action.payload.buy], */
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
