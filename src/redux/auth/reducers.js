import { authTypes } from './types';
import { initialState } from '../store/initialState';

export const authReducers = (state = initialState.auth, action) => {
  switch (action.type) {
    case authTypes.SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        loading: false
      }
    case authTypes.SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: true
      }
    default:
      return state
  }
}