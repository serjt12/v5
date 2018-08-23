import { FETCH_CURRENT_USER } from './AuthActions';

const AuthReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return action.payload.userInfo || false;
    default:
      return state;
  }
};

// Export Reducer
export default AuthReducer;
