import { LOCAL_KEYS } from "../../constants/localKeys";
import { API_ROUTER } from "../../services/apis";
import { axiosHandler, axiosPost } from "../../services/axios";
import { removeAll, setItem } from "../../utils/localStorage";
import {
  LOGIN_FAILURE,
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../types/authTypes";

// login action
export const loginInit = (user) => {
  return {
    type: LOGIN_INIT,
    payload: user,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

// THUNKS CALLS

export const login = ({ email, password }, callback) => {
  return async (dispatch) => {
    try {
      const response = await axiosPost(API_ROUTER.LOGIN, {
        email,
        password,
      });
      if (response.status) {
        const user = response?.user;
        axiosHandler.defaults.headers.common.Authorization = `Bearer ${response?.accessToken}`;
        setItem(LOCAL_KEYS.token, response?.accessToken);
        setItem(LOCAL_KEYS.auth, user);
        dispatch(loginSuccess(user));
        callback(user);
      } else {
        dispatch(loginFailure(response?.message));
        callback("");
      }
    } catch (error) {
      dispatch(loginFailure("Something went wrong"));
    }
  };
};

export const logoutHandlers = () => {
  return (dispatch) => {
    delete axiosHandler.defaults.headers.common.Authorization;
    dispatch(logout());
    removeAll();
  };
};
