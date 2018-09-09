import { SIGNUP_MSG, FETCH_CURRENT_USER, ADD_TO_TRAVEL_MSG } from './AuthActions';

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
      return {
        ...state,
        signupmsg: (action.payload.userInfo) ? 'Bienvenido a TOBCITY ingresa en login' : (action.payload.error),
      };
    case ADD_TO_TRAVEL_MSG:
      return {
        ...state,
        addtotravelmsg: (action.payload.success),
      };
    default:
      return state;
  }
};

// Export Reducer
export default AuthReducer;
