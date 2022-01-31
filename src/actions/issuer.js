import {
  GET_ISSUER_REQUESTS,
  UPDATE_ISSUER_REQUEST,
} from "./types";

import IssuerService from "../services/issuerService";

export const getRequests = () => async (dispatch) => {
  try {
    const response = await IssuerService.getRequests();

    dispatch({
      type: GET_ISSUER_REQUESTS,
      payload: response.data,
    });

  } catch (error) {
    console.log(error);
  }
};

export const updateRequest = (data) => async (dispatch) => {
  try {
    const response = await IssuerService.updateRequest(data);

    dispatch({
      type: UPDATE_ISSUER_REQUEST,
      payload: data,
    });

    return Promise.resolve(response.data);

  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}