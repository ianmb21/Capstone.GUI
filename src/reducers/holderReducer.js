import {
  GET_HOLDER_REQUESTS,
  CREATE_REQUEST,
} from "../actions/types";

const initialState = {
  allRequests: [],
};

export const holderReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case GET_HOLDER_REQUESTS:
      return {
        ...state,
        allRequests: payload,
      };

    case CREATE_REQUEST:
      return {
        ...state,
        allRequests: [...state.allRequests, ...payload],
      };

    default:
      return state;
  }

};