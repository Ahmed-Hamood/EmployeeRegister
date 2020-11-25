import { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import AuthContext from "../../context/Auth_Company/AuthContext"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, loading } = authContext



  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
