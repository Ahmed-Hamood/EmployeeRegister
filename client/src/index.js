import ReactDOM from "react-dom"
import App from "./App"

import EmployeeState from "./context/Employee/EmployeeState"
import AuthState from "./context/Auth_Company/AuthState"
import AlertState from "./context/Alert/AlertState"

ReactDOM.render(
  <AuthState>
    <AlertState>
      <EmployeeState>
        <App />
      </EmployeeState>
    </AlertState>
  </AuthState>,
  document.getElementById("root")
)
