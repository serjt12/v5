/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import auth from './modules/Home/AuthReducer';
import intl from './modules/Intl/IntlReducer';
import travel from './modules/Travel/TravelReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  intl,
  auth,
  travel,
});
