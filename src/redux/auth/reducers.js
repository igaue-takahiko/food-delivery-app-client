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
    case authTypes.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      }
    case authTypes.SET_UNAUTHENTICATED:
      return initialState.auth
    default:
      return state
  }
}