import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  COMPANY_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "./types"

export default (state, action) => {
  switch (action.type) {
    case COMPANY_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: true,
        companyInfo: { ...action.payload },
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        isAuthenticated: true,
        loading: true,
        errors: [],
      }
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        companyInfo: {},
        errors: action.payload,
      }
    case LOGOUT:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        companyInfo: {},
        errors: [],
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      }
    default:
      return state
  }
}
