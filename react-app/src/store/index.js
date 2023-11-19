import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import exercise from './exercise'
import journal from './journal'
import meditation from './meditation'
import nutrition from './nutrition'
import sleep from './sleep'
import stress from './stress'


const rootReducer = combineReducers({
  session,
  exercise,
  journal,
  meditation,
  nutrition,
  sleep,
  stress
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
