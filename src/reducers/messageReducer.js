import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = "";

export const messageReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case SET_MESSAGE:
      return payload;

    case CLEAR_MESSAGE:
      return "";

    default:
      return state;
  }

}