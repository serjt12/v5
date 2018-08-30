import { FETCH_CURRENT_USER, ACTIVE_USER } from './AuthActions';

// Initial State
const initialState = {
  currentUser: null,
  user: null,
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.userInfo || false,
      };
    case ACTIVE_USER:
      return {
        ...state,
        user: action.user || false,
      };
    default:
      return state;
  }
};

// Export Reducer
export default AuthReducer;
