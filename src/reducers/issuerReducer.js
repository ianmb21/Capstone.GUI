import {
  GET_ISSUER_REQUESTS,
  UPDATE_ISSUER_REQUEST,
} from "../actions/types";

const initialState = {
  allRequests: [],
};

export const issuerReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case GET_ISSUER_REQUESTS:
      return {
        ...state,
        allRequests: payload,
      };

    case UPDATE_ISSUER_REQUEST:
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