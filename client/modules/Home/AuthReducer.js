import { SIGNUP_MSG, FETCH_CURRENT_USER, ACTIVE_USER } from './AuthActions';

// Initial State
const initialState = {
  currentUser: null,
  msg: '',
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.userInfo || false,
      };
    case SIGNUP_MSG:
    console.log(action)
      return {
        ...state,
        msg: (action.payload.userInfo) ? 'Bienvenido a TOBCITY ingresa en login' : (action.payload.error) ,
      };
    default:
      return state;
  }
};

// Export Reducer
export default AuthReducer;
