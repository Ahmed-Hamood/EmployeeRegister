import { useState, useContext, useEffect } from 'react'
import './EmployeeForm.css'
import EmployeeContext from '../../context/Employee/EmployeeContext'
import AlertContext from '../../context/Alert/AlertContext'




const EmployeeForm = () => {
  const employeeContext = useContext(EmployeeContext)
  const alertContext = useContext(AlertContext)

  const { addEmployee, updateEmployee, clearCurrentEmployee, success_post, success_put, success_delete, currentEmployee, form_error, clearErrors } = employeeContext;
  const { setAlert } = alertContext;
  useEffect(() => {
    if (form_error.length !== 0) {
      setAlert(form_error);
      clearErrors();
    }
    if (currentEmployee !== null) {
      setEmployee(currentEmployee)
    }
    if (currentEmployee !== null && success_post) {
      setEmployee({
        Name: '',
        Gender: '',
        Email: '',
        Nationality: '',
        MobilePhone: '',
        EmployeeCategory: '',
        DateOfJoin: '',
        EmployeeSalary: ''
      })
    }
    if (success_post) {
      console.log('Clear Form ')
      setAlert(['Created'])
      ClearForm();
    }
    if (success_put) {
      console.log('Clear Form')
      setAlert(['Updated'])
      ClearForm();
    }
    if (success_delete) {
      console.log('Clear Form')
      setAlert(['Deleted'])
      ClearForm();
    }
  }, [currentEmployee, form_error, success_post, success_put, success_delete])

  const [employee, setEmployee] = useState({
    Name: '',
    Gender: '',
    Email: '',
    Nationality: '',
    MobilePhone: '',
    EmployeeCategory: '',
    DateOfJoin: '',
    EmployeeSalary: ''
  });

  const { Name, Gender, Email, Nationality, MobilePhone, EmployeeCategory, DateOfJoin, EmployeeSalary } = employee

  const onChange = e => {
    setEmployee({ ...employee, [e.target.name]: e.target.value })
  }



  const onSubmit = e => {
    e.preventDefault()
    if (!currentEmployee) {
      addEmployee(employee)

    } else {
      updateEmployee(employee)
    }

  }

  const ClearForm = () => {
    clearCurrentEmployee()
    setEmployee({
      Name: '',
      Gender: '',
      Email: '',
      Nationality: '',
      MobilePhone: '',
      EmployeeCategory: '',
      DateOfJoin: '',
      EmployeeSalary: ''
    })
  }


  return (
    <form onSubmit={onSubmit} >

      <div className="form-container">
        <div className="form-section-left">
          <label>Name</label>
          <input type="text" name="Name" placeholder="Enter Name" value={Name} onChange={onChange} />

          <label>Gender</label>
          <select name="Gender" onChange={onChange} value={Gender} required>
            <option value="" defaultValue> Select Gender ... </option>
            <option value="male" > Male </option>
            <option value="female">Female </option>
          </select>

          <label>Email</label>
          <input type="email" name="Email" placeholder="example@hotmail.com" value={Email} onChange={onChange} required />
          <label>Nationality</label>
          <input type="text" name="Nationality" id="" placeholder="Enter Nationality" value={Nationality} onChange={onChange} required />
        </div>

        <div className="form-section-right">
          <label>MobilePhone</label>
          <input type="tel" name="MobilePhone" placeholder="05XXXXXXXX" maxLength="10" value={MobilePhone} onChange={onChange} required />
          <label>Employee Category</label>
          <select name="EmployeeCategory" onChange={onChange} value={EmployeeCategory} required>
            <option value="" defaultValue > Select Employee Category ... </option>
            <option value="A"> A </option>
            <option value="B"> B </option>
            <option value="C"> C </option>
            <option value="D"> D </option>
          </select>
          <label> Date of join</label>
          <input type="text" name="DateOfJoin" placeholder="DD-MM-YYYY" value={DateOfJoin} onChange={onChange} required />
          <label> EmployeeSalary</label>
          <input type="number" name="EmployeeSalary" placeholder="Enter Employee Salary" min="1" value={EmployeeSalary} onChange={onChange} required />
        </div>

        <div className="form-btn">

          <input type="submit" value={currentEmployee === null ? 'Save' : 'Update'} className="f-btn btn-save" />
          <input type="clear" onClick={ClearForm} defaultValue="CLEAR" className="f-btn btn-clear" />
        </div>

      </div>



    </form>
  )
}

export default EmployeeForm;