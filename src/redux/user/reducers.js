import { userTypes } from "./types";
import { initialState } from "../store/initialState";

export const userReducers = (state = initialState.user, action) => {
  switch (action.type) {
    case userTypes.SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        loading: false,
      };
    case userTypes.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case userTypes.SET_UNAUTHENTICATED:
      return initialState.user;
    case userTypes.LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case userTypes.ADD_ITEM:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    case userTypes.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case userTypes.EDIT_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? { ...action.payload } : item
        ),
      };
    default:
      return state;
  }
};
