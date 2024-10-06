import {
  SCHEDULE_REQUEST,
  SCHEDULE_SUCCESS,
  SCHEDULE_FAIL
} from "../constants/constants";
// import { DETAILS_REQUEST, DETAILS_SUCCESS, DETAILS_FAIL } from "../constants/constants";
import { API, HEADERS } from "../constants/baseUrl";
// import { fetchToken } from "../utils";

import axios from "axios";

export const getSchedule = (year) => async (dispatch) => {
  try {
    dispatch({ type: SCHEDULE_REQUEST });
    const config = {
      headers: HEADERS,
    };

    const { data } = await axios.get(
      `${API}/${year}.json`,
      config
    );

    console.log(data);
    dispatch({ type: SCHEDULE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: SCHEDULE_FAIL,
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

