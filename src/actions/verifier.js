import {
  GET_VERIFIER_REQUESTS,
  UPDATE_VERIFIER_REQUEST,
} from "./types";

import VerifierService from "../services/verifierService";

export const getRequests = () => async (dispatch) => {
  try {
    const response = await VerifierService.getRequests();

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
}