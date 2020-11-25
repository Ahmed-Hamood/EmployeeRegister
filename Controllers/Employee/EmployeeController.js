const employee = require("../../Models/Employee")
const { check, validationResult } = require("express-validator")

exports.GetAllEmployees = async (req, res) => {
  try {
    const employees = await employee
      .find({ company: req.company.id })
      .sort({ DateOfJoin: -1 })
      .select("-__v")
    return res.json(employees)
  } catch (err) {
    console.error(err.message)
    return res.status(401).json({
      msg: "Server Error ....",
    })
  }
}

exports.CreateEmployee = async (req, res) => {
  console.log(req.body)
  const Errors = validationResult(req)
  // - if any validation Error then response with errors
  if (!Errors.isEmpty()) {
    return res.status(400).json({ Errors: Errors.errors.map(err => err.msg) })
  }

  const {
    Staffid,
    Name,
    Gender,
    Email,
    Nationality,
    MobilePhone,
    EmployeeCategory,
    DateOfJoin,
    EmployeeSalary,
  } = req.body

  try {
    const NewEmployee = await employee.create({
      Staffid,
      Name,
      Gender,
      Email,
      Nationality,
      MobilePhone,
      EmployeeCategory,
      DateOfJoin,
      EmployeeSalary,
      company: req.company.id,
    })

    return res.status(200).json(NewEmployee)
  } catch (error) {
    console.error(error.message)
    return res.status(401).json({
      Errors: ["Server Error ...."],
    })
  }
}

exports.UpdateEmployee = async (req, res) => {
  const {
    Staffid,
    Name,
    Gender,
    Email,
    Nationality,
    MobilePhone,
    EmployeeCategory,
    EmployeeSalary,
    DateOfJoin,
  } = req.body
  console.log(req.body)
  const UpdatedFields = {}

  if (Staffid) {
    UpdatedFields.Staffid = Staffid
  }
  if (Name) {
    UpdatedFields.Name = Name
  }
  if (Gender) {
    UpdatedFields.Gender = Gender
  }
  if (Email) {
    UpdatedFields.Email = Email
  }
  if (Nationality) {
    UpdatedFields.Nationality = Nationality
  }
  if (MobilePhone) {
    UpdatedFields.MobilePhone = MobilePhone
  }
  if (EmployeeCategory) {
    UpdatedFields.EmployeeCategory = EmployeeCategory
  }
  if (EmployeeSalary) {
    UpdatedFields.EmployeeSalary = EmployeeSalary
  }
  if (DateOfJoin) {
    UpdatedFields.DateOfJoin = DateOfJoin
  }

  if (Object.keys(UpdatedFields).length === 0) {
    return res.status(404).json({ Errors: ["Nothing to update"] })
  }

  const Errors = validationResult(req)
  // - if any validation Error then response with errors
  if (!Errors.isEmpty()) {
    return res.status(400).json({ Errors: Errors.errors.map(err => err.msg) })
  }

  try {
    let getEmployee = await employee.findById(req.params.id)

    if (!getEmployee) {
      return res.status(404).json({ Errors: ["Employee Not Found ...."] })
    }

    // - Check Company is Authorize to update current employee
    if (getEmployee.company.toString() !== req.company.id) {
      return res.status(401).json({ Errors: ["Not Authorized ...."] })
    }

    getEmployee = await employee.findByIdAndUpdate(
      req.params.id,
      { $set: UpdatedFields },
      { new: true }
    )

    res.json(getEmployee)
  } catch (error) {
    console.error(error.message)
    return res.status(401).json({
      Errors: ["Server Error ...."],
    })
  }
}

exports.DeleteEmployee = async (req, res) => {
  try {
    const getEmployee = await employee.findById(req.params.id)

    if (!getEmployee) {
      return res.status(404).json({ Errors: ["Employee Not Found ...."] })
    }

    // - Check Company is Authorize to update current employee
    if (getEmployee.company.toString() !== req.company.id) {
      return res.status(401).json({ Errors: ["Not Authorized ...."] })
    }

    await employee.findByIdAndRemove(req.params.id)

    res.json({ msg: "Employee Deleted" })
  } catch (error) {
    console.errors(error.message)
    return res.status(401).json({
      msg: "Server Error ....",
    })
  }
}
