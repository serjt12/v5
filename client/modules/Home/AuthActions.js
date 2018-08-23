import callApi from '../../util/apiCaller';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';

export function userAuth(user) {
  return {
    type: FETCH_CURRENT_USER,
    payload: user,
  };
}

export function fetchCurrentUser() {
  return (dispatch) => {
    return callApi('/current_user').then(res => dispatch(userAuth(res)));
  };
}
