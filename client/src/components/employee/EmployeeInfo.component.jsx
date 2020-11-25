import { useContext, useRef, useEffect, useMemo } from 'react'
import EmployeeContext from '../../context/Employee/EmployeeContext'
import './EmployeeInfo.css'


const EmployeeInfo = () => {
  const employeeContext = useContext(EmployeeContext);
  const text = useRef('');

  const { employees, filterEmployee, clearFilter, filteredEmployeesList } = employeeContext;

  useEffect(() => {
    if (filteredEmployeesList === null) {
      text.current.value = '';
    }
  }, [filteredEmployeesList])

  const onChange = (e) => {
    if (text.current.value === '') {
      clearFilter();
    }
  }

  const onClick = (e) => {
    e.preventDefault();
    if (text.current.value !== '') {
      filterEmployee(text.current.value);
    } else {
      clearFilter();
    }
  }

  const getTotalSalary = useMemo(() => {
    let total = 0;
    employees.forEach(employee => {
      total += employee.EmployeeSalary
    })
    return total
  }, [employees]);


  const getTotalEmployess = useMemo(() => {
    return employees.length
  }, [employees])


  return (
    <>
      <section className="upper-section">
        <div className="info-content">
          <h1> Total Employees </h1>
          <p> {getTotalEmployess} </p>
        </div>
        <div className="info-content mgl-30">
          <h1> Total Salary </h1>
          <p> {getTotalSalary} </p>
        </div>
      </section>
      <section className="lower-section">
        <form>
          <label htmlFor=""> Employee Search  </label>
          <input type="text" ref={text} placeholder="search for employee..." onChange={onChange} />
          <button className="search-btn" onClick={onClick}> Search </button>
        </form>
      </section>
    </>
  )
}

export default EmployeeInfo;