import { useState, useContext, useEffect } from 'react'
import './CompanyForm.css'
import AuthContext from '../../context/Auth_Company/AuthContext'
import AlertContext from '../../context/Alert/AlertContext'
import Alert from '../layout/Alert.component'
import Spinner from '../layout/Spinner'

const Register = (props) => {

  const [company, setCompany] = useState({
    CompanyId: '',
    CompanyName: '',
    CompanyEmail: '',
    CompanyPassword: '',
    ConfirmPassword: '',
  });

  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)

  const { CompanyId, CompanyName, CompanyEmail, CompanyPassword, ConfirmPassword } = company;

  const { RegisterCompany, errors, ClearErrors, isAuthenticated, loading } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (errors.length !== 0) {
      setAlert(errors);
      ClearErrors()
    }
    if (isAuthenticated) {
      setTimeout(() => {
        props.history.push('/')
      }, 1500)
    }
    // eslint-disable-next-line
  }, [errors, isAuthenticated, props.history])

  const onChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(company)
    RegisterCompany(company)
  }

  if (loading) {
    return <Spinner />
  }


  return (
    <div className="register-container">

      <h1 className="register-title">Account Register</h1>
      <div className="register-form">
        <form onSubmit={onSubmit} action="">

          <label htmlFor="CompanyName">CompanyName</label>
          <input type="text" id="CompanyName" name="CompanyName" onChange={onChange} value={CompanyName} placeholder='' required />
          <label htmlFor="CompanyId">Company Id</label>
          <input type="text" id="CompanyId" name="CompanyId" value={CompanyId} onChange={onChange} placeholder='' required />
          <label htmlFor="CompanyEmail">CompanyEmail</label>
          <input type="email" id="CompanyEmail" name="CompanyEmail" value={CompanyEmail} onChange={onChange} placeholder='' required />
          <label htmlFor="CompanyPassword">CompanyPassword</label>
          <input type="password" id="CompanyPassword" name="CompanyPassword" value={CompanyPassword} onChange={onChange} placeholder='' required />
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input type="password" id="ConfirmPassword" name="ConfirmPassword" value={ConfirmPassword} onChange={onChange} placeholder='' required />
          <input type="submit" value="Register" />
          <Alert />
        </form>
      </div>
    </div>
  )
}

export default Register;
