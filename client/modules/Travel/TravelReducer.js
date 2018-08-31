import { ADD_TRAVEL, ADD_TRAVELS, DELETE_TRAVEL, ADD_MY_TRAVELS } from './TravelActions';

// Initial State
const initialState = { data: [] };

const TravelReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRAVEL :
      return {
        data: [action.travel, ...state.data],
      };
    case ADD_MY_TRAVELS :
    console.log('my travels', action)
      return {
        data: action.mytravels,
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

// Get user travels
// export const getMyTravels = (state, user) => state.travel.data.filter(travel => travel.author === user);

// Get travel by cuid
export const getTravel = (state, cuid) => state.travel.data.filter(travel => travel.cuid === cuid)[0];

// Export Reducer
export default TravelReducer;
