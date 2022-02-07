import {
  GET_VERIFIER_REQUESTS,
  UPDATE_VERIFIER_REQUEST,
  SEARCH_HOLDER,
  CREATE_VERIFIER_REQUEST,
  GET_RECORD_TYPE,
} from "../actions/types";

const initialState = {
  allRequests: [],
  holderSearch: [],
  recordTypeId: [],
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

    case SEARCH_HOLDER:
      return {
        ...state,
        holderSearch: payload,
      };

    case CREATE_VERIFIER_REQUEST:
      return {
        ...state,
        allRequests: [...state.allRequests, ...payload],
      };

      case GET_RECORD_TYPE:
        return {
          ...state,
          recordTypeId: payload,
        };

    default:
      return state;
  }

};