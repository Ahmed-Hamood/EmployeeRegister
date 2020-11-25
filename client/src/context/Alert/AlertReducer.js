import { SET_ALERT, CLEAR_ALERT } from "./types"

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { alerts: action.payload }
    case CLEAR_ALERT:
      return { alerts: [] }
    default:
      return state
  }
}
