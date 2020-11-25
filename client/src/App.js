import { useEffect, useContext } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import NavBar from "./components/layout/NavBar.component"
import Home from "./components/pages/Home.component"
import About from "./components/pages/About.component"
import Register from "./components/auth/Register.component"
import Login from "./components/auth/Login.component"
import PrivateRoute from "./components/routing/PrivateRoute"

import setAuthToken from "./utilities/setAuthToken"
import AuthContext from "./context/Auth_Company/AuthContext"

// Attach x-auth-token into header if local storage token exist
if (localStorage.token) setAuthToken(localStorage.token)

const App = () => {
  const authContext = useContext(AuthContext)
  const { loadCompany } = authContext

  useEffect(() => {
    loadCompany()
  },[])

  return (
    <Router>
      <div className="container">
        <nav>
          <NavBar />
        </nav>
        {/* ###############################XXXXX############################ */}
        <div className="page-container">
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
