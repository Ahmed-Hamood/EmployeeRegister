import React, { useReducer } from "react"

import AlertContext from "./AlertContext"
import AlertReducer from "./AlertReducer"

import { SET_ALERT, CLEAR_ALERT } from "./types"

const AlertState = props => {
  const initialState = {
    alerts: [],
  }

  const [state, dispatch] = useReducer(AlertReducer, initialState)

  // Set Alert
  const setAlert = (alerts) => {
    dispatch({ type: SET_ALERT, payload: alerts })
    setTimeout(() =>  clearAlert(), 3000)
  }
  // Clear Alert
  const clearAlert = () => {
    dispatch({ type: CLEAR_ALERT})
  }

  return (
    <AlertContext.Provider
      value={{
        alerts: state.alerts,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState
