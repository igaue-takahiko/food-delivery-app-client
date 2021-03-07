import { uiTypes } from "./types";
import { initialState } from "../store/initialState";

export const uiReducers = (state = initialState.ui, action) => {
  switch (action.type) {
    case uiTypes.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        serverError: false,
      };
    case uiTypes.SET_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload.message,
        serverError: false,
      };
    case uiTypes.SET_ERROR_ITEM:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        serverError: false,
      };
    case uiTypes.SET_ERRORS_SIGNUP_SELLER:
      return {
        ...state,
        loading: false,
        errorsSeller: action.payload,
        serverError: false,
      };
    case uiTypes.SERVER_ERROR:
      return {
        ...state,
        loading: false,
        serverError: true,
        errors: null,
      };
    case uiTypes.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
        serverError: null,
      };
    case uiTypes.LOADING_UI:
      return {
        ...state,
        loading: true,
        serverError: false,
        signUpSuccess: false,
      };
    case uiTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true
      }
    default:
      return state;
  }
};
