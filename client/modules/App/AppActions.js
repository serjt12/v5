import callApi from '../../util/apiCaller';

// Export Constants
export const TOGGLE_ADD_TRAVEL = 'TOGGLE_ADD_TRAVEL';
export const LIKE_MSG = 'LIKE_MSG';

// Export Actions
export function toggleAddTravel() {
  return {
    type: TOGGLE_ADD_TRAVEL,
  };
}
export function likeMsg(msg) {
  return {
    type: LIKE_MSG,
    msg,
  };
}

export function addRatingRequest(rating, travel, passenger) {
  return (dispatch) => {
    return callApi('rate_user', 'post', {
      like: {
        travel,
        rateValue: rating,
        passenger,
      },
    }).then(res => dispatch(likeMsg(res)));
  };
}
