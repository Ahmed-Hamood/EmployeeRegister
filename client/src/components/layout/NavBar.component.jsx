import { useContext, useEffect } from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/Auth_Company/AuthContext'
import EmployeeContext from '../../context/Employee/EmployeeContext'

const NavBar = (props) => {

  const authContext = useContext(AuthContext)
  const employeeContext = useContext(EmployeeContext)
  const { isAuthenticated, logoutCompany, companyInfo} = authContext;
  const { clearEmployees } = employeeContext;

  const onClick = () => {
    logoutCompany();
    clearEmployees();
  }

  const Nav_AccountStatus = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Link to="/login" className="mgl-20"><p className="menu-title" > Login </p></Link>
          <Link to="/register" className="mgl-10" ><p className="menu-title" > Register </p></Link>
        </>
      )
    } else {
      return (
        <div className="logout-container">
          <p className="company-title">Hello, {companyInfo.CompanyName} </p>
          <Link to="/" className=" logout" onClick={onClick} > Logout </Link>
        </div>)
    }
  }


  return (
    <div className="nav-menu-container">

      <div className="top-menu">
        <Link to="/" className="menu logo">
          <img src="./img/logo2.png" alt="" className="menu-image" />
          <h1 className="menu-title black" > Employee Register </h1>
        </Link>

        <Link to="/" className="menu">
          <img src="./img/home.png" alt="" className="menu-image" />
          <h1 className="menu-title" > Home </h1>
        </Link>

        <Link to="/about" className="menu orange">
          <img src="./img/about.png" alt="" className="menu-image" />
          <h1 className="menu-title" > About </h1>
        </Link>
      </div>

      <div className="bottom-menu">
        <div className="menu user-content">
          <img src="./img/user.png" alt="" className="user-icon" />
           {Nav_AccountStatus()}
        </div>

      </div>

    </div>
  )
}

export default NavBar;