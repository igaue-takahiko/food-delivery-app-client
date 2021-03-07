import axios from "axios";
import { authTypes } from "./types";
import { uiTypes } from "../ui/types";

export const signupUser = (newUserData, history) => async (dispatch) => {
  dispatch({ type: uiTypes.LOADING_UI });

  await axios
    .post("/auth/signup-user", newUserData)
    .then((res) => {
      dispatch({ type: uiTypes.SIGNUP_SUCCESS });
      dispatch({ type: uiTypes.CLEAR_ERRORS });
      history.push("/login");
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response) {
        dispatch({
          type: uiTypes.SET_ERRORS,
          payload: error.response.data,
        });
      } else {
        dispatch({ type: uiTypes.SERVER_ERROR });
      }
    });
};

export const login = (userData, history) => async (dispatch) => {
  dispatch({ type: uiTypes.LOADING_UI });

  await axios
    .post("/auth/login", userData)
    .then((res) => {
      const jwt = `Bearer ${res.data.token}`;
      localStorage.setItem("jwt", jwt);
      axios.defaults.headers.common["Authorization"] = jwt;
      dispatch(getUserData());
      dispatch({ type: uiTypes.CLEAR_ERRORS });
      console.log("Authenticated, check localStorage", jwt);
      history.push("/");
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: uiTypes.SET_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch({ type: uiTypes.SERVER_ERROR });
      }
    });
};

export const getUserData = () => async (dispatch) => {
  dispatch({ type: authTypes.LOADING_USER });

  await axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: authTypes.SET_USER,
        payload: res.data.result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = (history) => async (dispatch) => {
  localStorage.removeItem("jwt");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: authTypes.SET_UNAUTHENTICATED });
  if (history) {
    history.push("/login");
  }
};
