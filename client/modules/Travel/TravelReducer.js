import { ADD_TRAVEL, ADD_TRAVELS, DELETE_TRAVEL, SHOW_MSG } from './TravelActions';

// Initial State
const initialState = {
  data: [],
  msg: '',
};

const TravelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MSG :
      return {
        msg: action.msg,
      };
    case ADD_TRAVEL :
      return {
        data: [action.travel, ...state.data],
      };
    case ADD_TRAVELS :
      return {
        data: action.travels,
      };

    case DELETE_TRAVEL :
      return {
        data: state.data.filter(travel => travel.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all travels
export const getTravels = state => state.travel.data;

// Get travel by cuid
export const getTravel = (state, cuid) => state.travel.data.filter(travel => travel.cuid === cuid)[0];

// Export Reducer
export default TravelReducer;
