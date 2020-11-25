import { useState, useEffect, useContext } from 'react'
import './CompanyForm.css'
import Alert from '../layout/Alert.component'
import AlertContext from '../../context/Alert/AlertContext'
import AuthContext from '../../context/Auth_Company/AuthContext'
import Spinner from '../../components/layout/Spinner'

const Login = (props) => {

  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)

  const { loadCompany, loginCompany, errors, ClearErrors, isAuthenticated, loading } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (errors.length !== 0) {
      console.log('errorororro', errors);
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



  const [company, setCompany] = useState({
    CompanyEmail: '',
    CompanyPassword: '',
  });

  const { CompanyEmail, CompanyPassword } = company;

  const onChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    loginCompany({ CompanyEmail, CompanyPassword })
  }

  if (loading) {
    return <Spinner />
  }


  return (
    <div className="register-container">
      <h1 className="register-title">Account Login</h1>

      <div className="register-form">
        <form onSubmit={onSubmit} action="">
          <label htmlFor="CompanyEmail">CompanyEmail</label>
          <input type="email" id="CompanyEmail" name="CompanyEmail" value={CompanyEmail} onChange={onChange} placeholder='' required />
          <label htmlFor="CompanyPassword">CompanyPassword</label>
          <input type="password" id="CompanyPassword" name="CompanyPassword" value={CompanyPassword} onChange={onChange} placeholder='' required />
          <input type="submit" value="Login" />
          <Alert />
        </form>
      </div>
    </div>
  )
}

export default Login;
