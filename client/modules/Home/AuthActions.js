import callApi from '../../util/apiCaller';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const ACTIVE_USER = 'ACTIVE_USER';
export const SIGNUP_MSG = 'SIGNUP_MSG';
export const ADD_TO_TRAVEL_MSG = 'ADD_TO_TRAVEL_MSG';
export const CONFIRM_MSG = 'CONFIRM_MSG';
export const CODE_MSG = 'CODE_MSG';

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
        cellphone: user.cellphone,
        name: user.username,
        city: user.city,
        dateUpdated: Date.now(),
      },
    }).then(res => dispatch(userAuth(res)));
  };
}
export function sendMsgConfirm(msgConfirm) {
  return {
    type: CONFIRM_MSG,
    payload: msgConfirm,
  };
}
export function sendUserCodeRequest(cellphone) {
  return (dispatch) => {
    return callApi('verify_cell', 'post', {
      user: {
        code: '57',
        cellphone,
      },
    }).then(res => dispatch(sendMsgConfirm(res)));
  };
}
export function sendMsgVerify(msgCellVerify) {
  return {
    type: CODE_MSG,
    payload: msgCellVerify,
  };
}
export function sendUserCodeConfirm(code, userID) {
  return (dispatch) => {
    return callApi('confirm_code', 'post', {
      user: {
        code,
        userID,
      },
    }).then(res => dispatch(sendMsgVerify(res)));
  };
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
