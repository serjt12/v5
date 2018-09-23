import callApi from '../../util/apiCaller';

// Export Constants
export const TOGGLE_ADD_TRAVEL = 'TOGGLE_ADD_TRAVEL';

// Export Actions
export function toggleAddTravel() {
  return {
    type: TOGGLE_ADD_TRAVEL,
  };
}

export function addRatingRequest(rating, userID, author) {
  console.log('author: %s, rating: %s, userID: %s', author, rating, userID);
  return (dispatch) => {
    return callApi(`rate_user/${userID}`, 'post', {
      likes: {
        likes: rating,
      },
    }).then(res => console.log(res));
  };
}
