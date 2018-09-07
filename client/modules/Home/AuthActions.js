import callApi from '../../util/apiCaller';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const ACTIVE_USER = 'ACTIVE_USER';
export const SIGNUP_MSG = 'SIGNUP_MSG';
import axios from 'axios';

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
export function addUserUpdateRequest(user, userID) {
  console.log(Date.now)
  return (dispatch) => {
    return callApi(`update_user/${userID}`, 'put', {
      user: {
        email: user.email,
        cellphone: user.cellphone,
        name: user.username,
        city: user.city,
        dateUpdated: Date.now(),
      },
    }).then(res => dispatch(userAuth(res)));
  };
}

export function validateUser(user) {
  console.log('USER 2', user)
  return (dispatch) => {
    return axios
	.post('/auth/login', {
  user: {
    password: user.passsword,
    cellphone: user.cellphone,
  }
	})
	.then(res => { console.log(res.config.data)	})
  }
}
