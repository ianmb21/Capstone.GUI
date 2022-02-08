import {
  GET_VERIFIER_REQUESTS,
  UPDATE_VERIFIER_REQUEST,
  SEARCH_HOLDER,
  CREATE_VERIFIER_REQUEST,
  GET_RECORD_TYPE,
} from "./types";

import VerifierService from "../services/verifierService";

export const getRequests = (requestStatus = 'All') => async (dispatch) => {
  try {
    const response = await VerifierService.getRequests(requestStatus);

    dispatch({
      type: GET_VERIFIER_REQUESTS,
      payload: response.data,
    });

  } catch (error) {
    console.log(error);
  }
};

export const updateRequest = (data) => async (dispatch) => {
  try {
    const response = await VerifierService.updateRequest(data);

    dispatch({
      type: UPDATE_VERIFIER_REQUEST,
      payload: data,
    });

    return Promise.resolve(response.data);

  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const searchHolder = (firstName, lastName) => async (dispatch) => {
  try {
    const response = await VerifierService.searchHolder(firstName, lastName);

    dispatch({
      type: SEARCH_HOLDER,
      payload: response.data,
    });

    return Promise.resolve(response.data);

  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const createRequest = (userId, nationalId, firstName, lastName, birthdate, recordTypeIds, Remarks, holderId, verifiedBy) => async (dispatch) => {
  try {
    const response = await VerifierService.createRequest(userId, nationalId, firstName, lastName, birthdate, "PendingHolder", recordTypeIds, Remarks, holderId, verifiedBy);

    dispatch({
      type: CREATE_VERIFIER_REQUEST,
      payload: response.data,
    });

    return Promise.resolve(response.data);

  } catch (error) {
    return Promise.reject(error.response.data.errors);
  }
};

export const getRecordType = (userId) => async (dispatch) => {
  try {
    const response = await VerifierService.getRecordType(userId);

    dispatch({
      type: GET_RECORD_TYPE,
      payload: response.data,
    });

    return Promise.resolve(response.data);

  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};