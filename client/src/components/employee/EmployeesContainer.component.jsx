import { useContext, useEffect } from 'react';
import EmployeeContext from '../../context/Employee/EmployeeContext'
import EmployeeItem from './EmployeeItem.component'
import Spinner from '../layout/Spinner'


const EmployeesContainer = () => {
  const employeeContext = useContext(EmployeeContext)

  const { employees, filteredEmployeesList } = employeeContext;


  if (employees === null) {
    return <div style={{ width: '100%' }}> <Spinner /> </div>
  }

  if (employees.length === 0 && employees !== null) {
    return (
      <h1 className="fade" style={{ fontSize: '3rem', textAlign: 'center', width: '100%', color: 'gray', marginTop: '100px' }}>
        No Employees Available
      </h1>)
  }

  return (
    <>
      {
        filteredEmployeesList.length !== 0 ?
          (filteredEmployeesList.map(employee => <EmployeeItem key={employee.Staffid} employee={employee} />))
          : (employees.map(employee => <EmployeeItem key={employee.Staffid} employee={employee} />))
      }
    </>

  )




}

export default EmployeesContainer;