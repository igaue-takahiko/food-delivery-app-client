import axios from "axios";
import { userTypes } from "./types";
import { uiTypes } from "../ui/types";
import { apiInstance } from "../../utils/apiInstance";

export const signupUser = (newUserData, history) => async (dispatch) => {
  dispatch({ type: uiTypes.LOADING_UI });

  await apiInstance
    .post("/auth/signup-user", newUserData)
    .then((res) => {
      dispatch({ type: uiTypes.SIGNUP_SUCCESS });
      dispatch({ type: uiTypes.CLEAR_ERRORS });
      history.push("/login");
    })
    .catch((error) => {
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

  await apiInstance
    .post("/auth/login", userData)
    .then((res) => {
      const jwt = `Bearer ${res.data.token}`;
      localStorage.setItem("jwt", jwt);
      apiInstance.defaults.headers.common["Authorization"] = jwt;
      dispatch(getUserData());
      dispatch({ type: uiTypes.CLEAR_ERRORS });
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
  dispatch({ type: userTypes.LOADING_USER });

  const token = localStorage.jwt;
  apiInstance.defaults.headers.common["Authorization"] = token;

  await apiInstance
    .get("/user")
    .then((res) => {
      dispatch({
        type: userTypes.SET_USER,
        payload: res.data.result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signupSeller = (newSellerData, history) => async (dispatch) => {
  const location = `+${newSellerData.get("aptName")},+${newSellerData.get(
    "locality"
  )},+${newSellerData.get("street")},+${newSellerData.get("zip")}`;

  await axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    })
    .then((result) => {
      if (
        Array.isArray(result.data.results) &&
        result.data.results.length > 0
      ) {
        const formattedAddress = result.data.results[0].formatted_address;
        const lat = result.data.results[0].geometry.location.lat;
        const lng = result.data.results[0].geometry.location.lng;
        newSellerData.append("lat", lat);
        newSellerData.append("lng", lng);
        newSellerData.append("formattedAddress", formattedAddress);
      }
      dispatch(signupSellerFinal(newSellerData, history));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signupSellerFinal = (newSellerData, history) => async (
  dispatch
) => {
  dispatch({ type: uiTypes.LOADING_UI });

  await apiInstance
    .post("/auth/signup-seller", newSellerData)
    .then((res) => {
      dispatch({ type: uiTypes.SIGNUP_SUCCESS });
      dispatch({ type: uiTypes.CLEAR_ERRORS });
      history.push("/login");
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: uiTypes.SET_ERRORS_SIGNUP_SELLER,
          payload: error.response.data,
        });
      } else {
        dispatch({ type: uiTypes.SERVER_ERROR });
      }
    });
};

export const logout = (history) => async (dispatch) => {
  localStorage.removeItem("jwt");
  delete apiInstance.defaults.headers.common["Authorization"];
  dispatch({ type: userTypes.SET_UNAUTHENTICATED });
  if (history) {
    history.push("/login");
  }
};
