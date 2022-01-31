import {
  GET_VERIFIER_REQUESTS,
  UPDATE_VERIFIER_REQUEST,
} from "../actions/types";

const initialState = {
  allRequests: [],
};

export const verifierReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case GET_VERIFIER_REQUESTS:
      return {
        ...state,
        allRequests: payload,
      };

    case UPDATE_VERIFIER_REQUEST:
      return {
        ...state,
        allRequests: state.allRequests.filter(
          ({ requestId }) => requestId !== payload.requestId
        ),
      };

    default:
      return state;
  }

};