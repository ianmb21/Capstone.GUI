import {
  GET_HOLDER_REQUESTS,
  GET_NATIONAL_ID,
  CREATE_REQUEST,
  UPDATE_HOLDER_REQUEST_STATUS
} from "../actions/types";

const initialState = {
  allRequests: [],
  nationalId: "",
};

export const holderReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case GET_HOLDER_REQUESTS:
      return {
        ...state,
        allRequests: payload,
      };

    case GET_NATIONAL_ID:
      return {
        ...state,
        nationalId: payload,
      };

    case CREATE_REQUEST:
      return {
        ...state,
        allRequests: [...state.allRequests, ...payload],
      };

    case UPDATE_HOLDER_REQUEST_STATUS:
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