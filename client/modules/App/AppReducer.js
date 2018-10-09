// Import Actions
import { TOGGLE_ADD_TRAVEL, LIKE_MSG } from './AppActions';

// Initial State
const initialState = {
  showAddTravel: false,
  likeMsg: '',
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_TRAVEL:
      return {
        ...state,
        showAddTravel: !state.showAddTravel,
      };
    case LIKE_MSG:
      return {
        ...state,
        likeMsg: action.msg.msglike,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddTravel = state => state.app.showAddTravel;

// Export Reducer
export default AppReducer;
