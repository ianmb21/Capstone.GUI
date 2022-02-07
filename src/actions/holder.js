import {
  GET_HOLDER_REQUESTS,
  CREATE_REQUEST,
} from "./types";

import HolderService from "../services/holderService";

export const getRequests = (userId, requestStatus='All') => async (dispatch) => {
  try {
    const response = await HolderService.getRequests(userId, requestStatus);

    dispatch({
      type: GET_HOLDER_REQUESTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createRequest = (userId, nationalId, firstName, lastName, birthdate, recordTypeIds) => async (dispatch) => {
  try {
    const response = await HolderService.createRequest(userId, nationalId, firstName, lastName, birthdate, "New Request", recordTypeIds);

    dispatch({
      type: CREATE_REQUEST,
      payload: response.data,
    });

    return Promise.resolve(response.data);

  } catch (error) {
    return Promise.reject(error.response.data.errors);
  }
};