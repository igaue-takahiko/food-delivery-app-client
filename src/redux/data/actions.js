import { dataTypes } from './types';
import { uiTypes } from '../ui/types';
import { userTypes } from '../user/types';
import axios from 'axios';
import { apiInstance } from '../../utils/apiInstance';
import { getUserData } from '../user/actions';

export const addItem = (itemData) => async (dispatch) => {
  dispatch({ type: uiTypes.LOADING_UI })

  await apiInstance.post("/seller/create-item", itemData).then((res) => {
    dispatch({
      type: userTypes.ADD_ITEM,
      payload: res.data.item,
    })
    dispatch({ type: uiTypes.CLEAR_ERRORS })
  }).catch((error) => {
    if (error.response) {
      dispatch({
        type: uiTypes.SET_ERROR_ITEM,
        payload: error.response.data
      })
    } else {
      dispatch({ type: uiTypes.SERVER_ERROR })
    }
  })
}