import { useReducer, useContext } from "react"
import axios from "axios"

import AuthContext from "./AuthContext"
import AuthReducer from "./AuthReducer"
import setAuthToken from "../../utilities/setAuthToken"

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

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    errors: [],
    companyInfo: {
      id: null,
      CompanyEmail: null,
      CompanyId: null,
      CompanyName: null,
      AddedDate: null,
    },
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // Get and Load Company
  const loadCompany = async () => {
    // Set Global Header
    if (localStorage.token) setAuthToken(localStorage.token)

    try {
      const res = await axios.get("/api/company/")
      dispatch({ type: COMPANY_LOADED, payload: res.data })
      console.log("Load company Success ......")
    } catch (error) {
      if (!localStorage.token) dispatch({ type: AUTH_ERROR, payload: [] })
      else dispatch({ type: AUTH_ERROR, payload: error.response.data.Errors })
      console.log("Load company Failed ......")
    }
  }

  // Register Company
  const RegisterCompany = async data => {
    const configReq = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      const response = await axios.post(
        "/api/company/auth/signup",
        data,
        configReq
      )

      dispatch({ type: REGISTER_SUCCESS, payload: response.data })
    } catch (error) {
      console.dir(error)
      if (error.message === "Network Error") {
        dispatch({ type: REGISTER_FAIL, payload: ["Server Error"] })
      } else {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.Errors })
      }
    }
  }

  // Login Company
  const loginCompany = async data => {
    const configReq = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const response = await axios.post(
        "/api/company/auth/login",
        data,
        configReq
      )
       
     
      dispatch({ type: LOGIN_SUCCESS, payload: response.data })
      loadCompany()
    } catch (error) { 
      console.dir(error)
      // console.log(error)
      if (error.message === "Network Error") {
        dispatch({ type: LOGIN_FAIL, payload: ["Server Error"] })
      } else {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.Errors })
      }
    }
  }

  // Logout Company
  const logoutCompany = () => {
    dispatch({ type: LOGOUT })
  }

  // Clear Errors
  const ClearErrors = () => {
    dispatch({ type: CLEAR_ERRORS })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        errors: state.errors,
        companyInfo: {
          id: state.companyInfo.id,
          CompanyEmail: state.companyInfo.CompanyEmail,
          CompanyId: state.companyInfo.CompanyId,
          CompanyName: state.companyInfo.CompanyName,
          AddedDate: state.companyInfo.AddedDate,
        },
        loadCompany,
        RegisterCompany,
        loginCompany,
        ClearErrors,
        logoutCompany,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
