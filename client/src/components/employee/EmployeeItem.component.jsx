import { useContext } from 'react';
import './EmployeeItem.css'
import EmployeeContext from '../../context/Employee/EmployeeContext'

const EmployeeItem = ({ employee }) => {
  const employeeContext = useContext(EmployeeContext)

  const { deleteEmployee, setCurrentEmployee, clearCurrentEmployee, currentEmployee } = employeeContext;
  const { _id, Staffid, Name, Gender, Email, Nationality, MobilePhone, EmployeeCategory, EmployeeSalary, DateOfJoin } = employee;


  const onDelete = () => {
    deleteEmployee(_id)
    clearCurrentEmployee();
  }

  const setCurrent = () => {
    setCurrentEmployee(employee)
  }

  return (
    <div className="employee-item fade">
      <div className="item-group">
        <p className="item-paragraph"> StaffID :  {Staffid}  </p>
        <div className="line"></div>
        <p className="item-paragraph"> Name :  {Name}  </p>
        <div className="line"></div>
        <p className="item-paragraph"> Gender :  {Gender}  </p>
        <div className="line"></div>
        <p className="item-paragraph"> Salary :  {EmployeeSalary}  </p>

      </div>
      <div className="item-group">
        <p className="item-paragraph"> Nationality : {Nationality}  </p>
        <div className="line"></div>
        <p className="item-paragraph"> MobilePhone : {MobilePhone}  </p>
        <div className="line"></div>
        <p className="item-paragraph"> DateOfJoin : {DateOfJoin}  </p>
        <div className="line"></div>
        <p className="item-paragraph"> Email : {Email}  </p>

        {
        currentEmployee===null ?
         <button className="btn green" onClick={setCurrent}> UPDATE </button>:
         <button className="btn gray" disabled > UPDATE </button>
        
        }
        <button className="btn mgl-10 red" onClick={onDelete}> DELETE </button>
      </div>


      <p className={"item-cat " + (EmployeeCategory === 'A' ? 'gold' : EmployeeCategory === 'B' ? 'green-cat' : 'white')} >
        {EmployeeCategory}
      </p>

    </div>
  )
}

export default EmployeeItem;