import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  FILTER_EMPLOYEES,
  CLEAR_FILTER,
  SET_FILL_CURRENT,
  CLEAR_FILL_CURRENT,
  CLEAR_EMPLOYEES,
  FORM_ERROR,
  CLEAR_ERRORS,
} from "./types"

export default (state, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      }
    case ADD_EMPLOYEE:
      return {
        ...state,
        form_error: [],
        employees: [action.payload, ...state.employees],
        success_post: true,
      }
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee._id === action.payload._id ? action.payload : employee
        ),
        success_put: true,
      }
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(emp => emp._id !== action.payload),
        success_delete: true
      }
    case FILTER_EMPLOYEES:
      return {
        ...state,
        filteredEmployeesList: state.employees.filter(emp => {
          const Regex = new RegExp(`${action.payload}`, "gi")
          return emp.Name.match(Regex) || emp.Email.match(Regex)
        }),
      }
    case CLEAR_EMPLOYEES:
      return {
        ...state,
        employees: [],
        filteredEmployeesList: [],
        currentEmployee: null,
        form_error: [],
      }
    case CLEAR_FILTER:
      return { ...state, filteredEmployeesList: [] }

    case SET_FILL_CURRENT:
      return { ...state, currentEmployee: action.payload }
    case CLEAR_FILL_CURRENT:
      return {
        ...state,
        currentEmployee: null,
        success_put: false,
        success_delete: false,
        success_post: false
      }
    case FORM_ERROR:
      return {
        ...state,
        success_post: false,
        success_put: false,
        form_error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        success_post: false,
        success_put: false,
        success_delete: false,
        form_error: [],
      }
    default:
      return state
  }
}
