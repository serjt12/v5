import callApi from '../../util/apiCaller';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const ACTIVE_USER = 'ACTIVE_USER';
export const SIGNUP_MSG = 'SIGNUP_MSG';
export const ADD_TO_TRAVEL_MSG = 'ADD_TO_TRAVEL_MSG';
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

export function sendMsgSignup(msg) {
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
    }).then(res => dispatch(sendMsgSignup(res)));
  };
}
export function addUserUpdateRequest(user, userID) {
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
export function sendMsgaddToTravel(msg) {
  return {
    type: ADD_TO_TRAVEL_MSG,
    payload: msg,
  };
}
export function addTravelToUserRequest(data) {
  return (dispatch) => {
    return callApi('confirmation', 'post', {
      data: {
        userid: data.userid,
        travelid: data.travelid,
      },
    }).then(res => dispatch(sendMsgaddToTravel(res)));
  };
}
