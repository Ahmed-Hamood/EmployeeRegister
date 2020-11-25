import { useContext, useEffect } from 'react'
import EmployeeForm from '../employee/EmployeeForm.component'
import EmployeesContainer from '../employee/EmployeesContainer.component'
import EmployeeInfo from '../employee/EmployeeInfo.component'
import Alert from '../layout/Alert.component'

import './Home.css'

import AuthContext from '../../context/Auth_Company/AuthContext'
import EmployeeContext from '../../context/Employee/EmployeeContext'
const Home = (props) => {
  const authContext = useContext(AuthContext);
  const employeeContext = useContext(EmployeeContext);
  const { isAuthenticated, loadCompany, load } = authContext
  const { getEmployees } = employeeContext

  useEffect(() => {
    if (isAuthenticated)
      getEmployees()
    // eslint-disable-next-line
  }, [])


  return (

    <div className="home-container fade">
      <div className="form-container">
        <EmployeeForm />
      </div>

       <Alert />  
     

      <div className="info-container">
        <EmployeeInfo />
      </div>

      <div className="employees-container">
        <EmployeesContainer />
      </div>
    </div>

  )
}

export default Home;