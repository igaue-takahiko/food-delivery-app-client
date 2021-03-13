import { dataTypes } from "./types";
import { initialState } from "../store/initialState";

export const dataReducers = (state = initialState.data, action) => {
  switch (action.type) {
    case dataTypes.LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case dataTypes.SET_RESTAURANTS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };
    case dataTypes.SET_RESTAURANT:
      return {
        ...state,
        loading: false,
        restaurant: action.payload.result,
      };
    case dataTypes.ADD_CART_SUCCESS:
      return {
        ...state,
        addCartSuccess: true,
      };
    case dataTypes.ADD_CART_FAIL:
      return {
        ...state,
        addCartSuccess: false,
      };
    case dataTypes.DELETE_ITEM_CART:
      return {
        ...state,
        deleteSuccessItem: true,
      };
    case dataTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case dataTypes.EDIT_STATUS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? { ...action.payload } : order
        ),
      };
    case dataTypes.SET_CART:
      return {
        ...state,
        loading: false,
        cart: action.payload.cart,
        price: action.payload.totalPrice,
      };
    default:
      return state;
  }
};
