import {
  GET_RECORD_DETAIL,
  REMOVE_SELECTED_RECORD,
} from "../actions/types";

const initialState = {
  selectedRecords: [],
};

export const recordReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case GET_RECORD_DETAIL:
      return {
        ...state,
        selectedRecords: payload,
      };

    case REMOVE_SELECTED_RECORD:
      return {
        ...state,
        selectedRecords: [],
      };

    default:
      return state;
  }

};