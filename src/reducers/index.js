import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { messageReducer } from "./messageReducer";
import { holderReducer } from "./holderReducer";
import { issuerReducer } from "./issuerReducer";
import { verifierReducer } from "./verifierReducer";
import { recordReducer } from "./recordReducer";

import {
  LOGOUT
} from "../actions/types";

const appReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  holder: holderReducer,
  issuer: issuerReducer,
  verifier: verifierReducer,
  record: recordReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
}

export default rootReducer;