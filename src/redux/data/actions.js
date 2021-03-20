import { dataTypes } from "./types";
import { uiTypes } from "../ui/types";
import { userTypes } from "../user/types";
import axios from "axios";
import { apiInstance } from "../../utils/apiInstance";
import { getUserData } from "../user/actions";

export const fetchRestaurants = () => async (dispatch) => {
  dispatch({ type: dataTypes.LOADING_DATA });

  await apiInstance
    .get("/restaurants")
    .then((res) => {
      dispatch({
        type: dataTypes.SET_RESTAURANTS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: dataTypes.SET_RESTAURANTS,
        payload: [],
      });
    });
};

export const fetchRestaurant = (restId) => async (dispatch) => {
  dispatch({ type: dataTypes.LOADING_DATA });
  await apiInstance
    .get(`/restaurant/${restId}`)
    .then((res) => {
      dispatch({
        type: dataTypes.SET_RESTAURANT,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: dataTypes.SET_RESTAURANT,
        payload: {},
      });
    });
};

export const fetchRestaurantsByAddress = (lat, lng) => async (dispatch) => {
  dispatch({ type: dataTypes.LOADING_DATA });

  await apiInstance
    .get(`/restaurants-location/${lat}/${lng}`)
    .then((res) => {
      dispatch({
        type: dataTypes.SET_RESTAURANTS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: dataTypes.SET_RESTAURANTS,
        payload: [],
      });
    });
};

export const addItem = (itemData) => async (dispatch) => {
  dispatch({ type: uiTypes.LOADING_UI });

  await apiInstance
    .post("/seller/create-item", itemData)
    .then((res) => {
      dispatch({
        type: userTypes.ADD_ITEM,
        payload: res.data.item,
      });
      dispatch({ type: uiTypes.CLEAR_ERRORS });
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: uiTypes.SET_ERROR_ITEM,
          payload: error.response.data,
        });
      } else {
        dispatch({ type: uiTypes.SERVER_ERROR });
      }
    });
};

export const editItem = (itemData, itemId) => async (dispatch) => {
  await apiInstance
    .put(`/seller/edit-item/${itemId}`, itemData)
    .then((res) => {
      dispatch({
        type: userTypes.EDIT_ITEM,
        payload: res.data.item,
      });
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: uiTypes.SET_ERROR_ITEM,
          payload: error.response.data,
        });
      } else {
        dispatch({ type: uiTypes.SERVER_ERROR });
      }
    });
};

export const deleteItem = (itemId) => async (dispatch) => {
  await apiInstance
    .delete(`/seller/delete-item/${itemId}`)
    .then((res) => {
      dispatch({
        type: userTypes.DELETE_ITEM,
        payload: itemId,
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const addToCart = (itemData) => async (dispatch) => {
  await apiInstance
    .post("/cart", itemData)
    .then((res) => {
      dispatch({
        type: dataTypes.ADD_CART_SUCCESS,
        payload: itemData.itemId,
      });
      dispatch(getCart());
    })
    .catch((error) => {
      dispatch({ type: dataTypes.ADD_CART_FAIL });
    });
};

export const getCart = () => async (dispatch) => {
  await apiInstance
    .get("/cart")
    .then((res) => {
      dispatch({
        type: dataTypes.SET_CART,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.response);
      dispatch({
        type: dataTypes.SET_CART,
        payload: [],
      });
    });
};

export const deleteCartItem = (itemData) => async (dispatch) => {
  await apiInstance
    .post("/delete-cart-item", itemData)
    .then((res) => {
      dispatch({ type: dataTypes.DELETE_ITEM_CART });
      dispatch(getCart());
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const removeCartItem = (itemId) => async (dispatch) => {
  await apiInstance
    .post(`/remove-cart-item/${itemId}`)
    .then((res) => {
      dispatch(getCart());
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const fetchAddress = (userData, history) => async (dispatch) => {
  const location = `+${userData.aptName},+${userData.locality},+${userData.street},+${userData.zip}`;
  await axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    })
    .then((result) => {
      const formattedAddress = result.data.results[0].formatted_address;
      const lat = result.data.results[0].geometry.location.lat;
      const lng = result.data.results[0].geometry.location.lng;
      userData.lat = lat;
      userData.lng = lng;
      userData.formattedAddress = formattedAddress;
      dispatch(addAddress(userData, history));
    });
};

export const addAddress = (userData, history) => async (dispatch) => {
  await apiInstance
    .post("/user/address", userData)
    .then((res) => {
      dispatch(getUserData());
      dispatch({ type: uiTypes.CLEAR_ERRORS });
      dispatch(placeOrder(history));
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

export const placeOrder = (history) => async (dispatch) => {
  await apiInstance
    .post("/order")
    .then((res) => {
      dispatch(getOrders());
      history.push("/orders");
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const getOrders = () => async (dispatch) => {
  dispatch({ type: dataTypes.LOADING_DATA });

  await apiInstance
    .get("/orders")
    .then((res) => {
      dispatch({
        type: dataTypes.SET_ORDERS,
        payload: res.data.orders,
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const changeOrderStatus = (orderId, body) => async (dispatch) => {
  await apiInstance
    .post(`/order-status/${orderId}`, body)
    .then((res) => {
      dispatch({
        type: dataTypes.EDIT_STATUS,
        payload: res.data.updateOrder,
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const socketStatusUpdate = (order) => async (dispatch) => {
  dispatch({ type: dataTypes.EDIT_STATUS, payload: order });
};
