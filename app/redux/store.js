import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import walletsReducer from './walletsReducer';
import thunk from 'redux-thunk';
import withDrawReducer from './withDrawReducer';
import depositReducer from './depositReducer';
import historyReducer from './historyReducer';
import transferReducer from './transferReducer';
import sendReducer from './sendReducer';
import tradesReducer from './tradesReducer';
import language from './language/reducer';

let reducers = combineReducers({
  sendPage: sendReducer,
  transferPage: transferReducer,
  historyPage: historyReducer,
  depositPage: depositReducer,
  walletsPage: walletsReducer,
  withDrawPage: withDrawReducer,
  tradePage: tradesReducer,
  language: language,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)),
);

/* export const store = createStore(
  reducers 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
); */
