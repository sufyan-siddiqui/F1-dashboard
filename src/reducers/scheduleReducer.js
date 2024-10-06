import {
    SCHEDULE_REQUEST,
    SCHEDULE_SUCCESS,
    SCHEDULE_FAIL
  } from '../constants/constants';
  
  export const getScheduleReducer = (state = {}, action) => {
    switch (action.type) {
      case SCHEDULE_REQUEST:
        return { loading: true };
      case SCHEDULE_SUCCESS:
        if(action.payload.MRData.RaceTable.Races){
          return { 
            ...state,
            loading: false, 
            schedule: action.payload.MRData.RaceTable.Races 
          };  
        } else {
          return { loading: false, schedule: [] };
        }
      case SCHEDULE_FAIL:
        return {
          loading: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };