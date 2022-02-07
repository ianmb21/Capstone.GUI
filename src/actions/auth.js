import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  GET_NATIONAL_ID,
} from "./types";

import AuthService from "../services/authService";

export const register = (username, password, roleName, nationalId) => (dispatch) => {
  return AuthService.register(username, password, roleName, nationalId)
    .then(
      () => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data;

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password)
    .then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data;

        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
};

export const logout = () => (dispatch) => {
  return AuthService.logout()
    .then(
      dispatch({
        type: LOGOUT,
      })
    );
};

export const getNationalId = (userId) => async (dispatch) => {
  try {
    const response = await AuthService.getNationalId(userId);

    dispatch({
      type: GET_NATIONAL_ID,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};