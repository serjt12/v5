import { SIGNUP_MSG, FETCH_CURRENT_USER, ADD_TO_TRAVEL_MSG, CONFIRM_MSG, CODE_MSG } from './AuthActions';

// Initial State
const initialState = {
  currentUser: null,
  msg: '',
  msgConfirm: '',
  msgCellVerify: '',
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
    case CONFIRM_MSG:
      return {
        ...state,
        msgConfirm: (action.payload.errors ? action.payload.errors.message : action.payload.msgConfirm),
      };
    case CODE_MSG:
      return {
        ...state,
        msgCellVerify: (action.payload.errors ? 'Tu codigo de verificacion parece incorrecto' : action.payload.msgCellVerify),
      };
    case ADD_TO_TRAVEL_MSG:
      return {
        ...state,
        addtotravelmsg: (action.payload.msg),
      };
    default:
      return state;
  }
};

// Export Reducer
export default AuthReducer;
