import {
  GET_HOLDER_REQUESTS,
  CREATE_REQUEST,
  UPDATE_HOLDER_REQUEST_STATUS,
} from "./types";

import HolderService from "../services/holderService";

export const getRequests = (userId) => async (dispatch) => {
  try {
    const response = await HolderService.getRequests(userId);

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

export const updateRequestStatus = (data) => async (dispatch) => {
  try {
    const response = await HolderService.updateRequestStatus(data);

    dispatch({
      type: UPDATE_HOLDER_REQUEST_STATUS,
      payload: data,
    });

    return Promise.resolve(response.data);

  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}