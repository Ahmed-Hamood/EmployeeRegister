import { useContext } from 'react';
import AlertContext from '../../context/Alert/AlertContext'
import './Alert.css'


const Alert = () => {
  const alertContext = useContext(AlertContext)
  const { alerts } = alertContext

  let container = 'alert-container';

  if (alerts.length === 0) {
    return <div className='alert-container' >  </div>
  }


  if (alerts[0] === 'Register') {
    return (
      <div className='alert-container green fade' >
        <p> Company Registered Successfully</p>
      </div>
    )
  }

  if (alerts[0] === 'Login') {
    return (
      <div className='alert-container green fade' >
        <p> Login successfully </p>
      </div>
    )
  }
  if (alerts[0] === 'Created') {
    return (
      <div className='alert-container green fade' >
        <p> Employee Created successfully </p>
      </div>
    )
  }
  if (alerts[0] === 'Updated') {
    return (
      <div className='alert-container green fade' >
        <p> Employee Updated successfully </p>
      </div>
    )
  }

  if (alerts[0] === 'Deleted') {
    return (
      <div className='alert-container fade' >
        <p> Employee Deleted successfully </p>
      </div>
    )
  }



  return (
    <div className='alert-container danger' >
      <ul>
        {alerts.map((alert, index) => {
          return <li key={index}> {alert}  </li>
        })}
      </ul>

    </div>
  )
}


export default Alert;