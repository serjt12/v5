import callApi from '../../util/apiCaller';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const ACTIVE_USER = 'ACTIVE_USER';
export const SIGNUP_MSG = 'SIGNUP_MSG';

export function userAuth(user) {
  return {
    type: FETCH_CURRENT_USER,
    payload: user,
  };
}

export function fetchCurrentUser() {
  return (dispatch) => {
    return callApi('current_user').then(res => dispatch(userAuth(res)));
  };
}

export function sendMsg(msg) {
  return {
    type: SIGNUP_MSG,
    payload: msg,
  };
}

export function addUserRequest(user) {
  return (dispatch) => {
    return callApi('signup', 'post', {
      user: {
        cellphone: user.cellphone,
        password: user.password,
      },
    }).then(res => dispatch(sendMsg(res)));
  };
}

export function validateUser(user) {
  console.log('USER 2', user)
  return (dispatch) => {
    return callApi('login', 'post', {
      user: {
        cellphone: user.cellphone,
        password: user.password,
      },
    }).then(res => console.log('REAPUESTA:', res));
  };
}
