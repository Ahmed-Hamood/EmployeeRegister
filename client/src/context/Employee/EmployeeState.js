import React, { useReducer } from "react"
import axios from "axios"

import EmployeeContext from "./EmployeeContext"
import EmployeeReducer from "./EmployeeReducer"

import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  FILTER_EMPLOYEES,
  CLEAR_FILTER,
  CLEAR_EMPLOYEES,
  SET_FILL_CURRENT,
  CLEAR_FILL_CURRENT,
  FORM_ERROR,
  CLEAR_ERRORS,
} from "./types"

const EmployeeState = props => {
  const initialState = {
    employees: [],
    currentEmployee: null,
    filteredEmployeesList: [],
    form_error: [],
    success_post: false,
    success_put: false,
    success_delete: false
  }

  const [state, dispatch] = useReducer(EmployeeReducer, initialState)

  console.log(state)
  // Get Employees 
  const getEmployees = async () => {
    try {
      const response = await axios.get("/api/employee/")
      dispatch({ type: GET_EMPLOYEES, payload: response.data })
    } catch (error) {
      console.log("error................")
      dispatch({ type: FORM_ERROR, payload: error.response.data.Errors })
    }
  }
  // Add An Employee
  const addEmployee = async employee => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    employee.Staffid = Math.floor(Math.random() * 10000)

    try {
      const response = await axios.post("/api/employee/", employee, config)
      dispatch({ type: ADD_EMPLOYEE, payload: response.data })
    } catch (error) {
      console.log("error................")
      dispatch({ type: FORM_ERROR, payload: error.response.data.Errors })
    }
  }

  // Delete An Employee
  const deleteEmployee = async id => {
    try {
      await axios.delete(`/api/employee/${id}`);
       dispatch({ type: DELETE_EMPLOYEE, payload: id })
    } catch (error) {
      dispatch({ type: FORM_ERROR, payload: error.response.data.Errors })
    }
   
  }

  // Update An Employee
  const updateEmployee = async employee => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
 

    try {
      const response = await axios.put(`/api/employee/${employee._id}`, employee, config)
      dispatch({ type: UPDATE_EMPLOYEE, payload: response.data })
    } catch (error) {
      console.log("error................")
      dispatch({ type: FORM_ERROR, payload: error.response.data.Errors })
    }
   
  }

  // Filter Employees
  const filterEmployee = val => {
    dispatch({ type: FILTER_EMPLOYEES, payload: val })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  // Fill Current Employee
  const setCurrentEmployee = employee => {
    dispatch({ type: SET_FILL_CURRENT, payload: employee })
  }

  // Clear Current Employee
  const clearCurrentEmployee = employee => {
    dispatch({ type: CLEAR_FILL_CURRENT })
  }

  const clearEmployees = () => {
    dispatch({ type: CLEAR_EMPLOYEES })
  }

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS })
  }

  return (
    <EmployeeContext.Provider
      value={{
        employees: state.employees,
        currentEmployee: state.currentEmployee,
        filteredEmployeesList: state.filteredEmployeesList,
        form_error: state.form_error,
        success_post: state.success_post,
        success_put: state.success_put,
        success_delete: state.success_delete,
        getEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        filterEmployee,
        clearFilter,
        clearEmployees,
        setCurrentEmployee,
        clearCurrentEmployee,
        clearErrors,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  )
}

export default EmployeeState
