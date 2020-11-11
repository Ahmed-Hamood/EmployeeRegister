const express = require("express")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const Company = require(".././Models/Company")
const Router = express.Router()

let ValidateRequestBody = [
  check("CompanyId", "Please Provide Company ID").not().isEmpty(),
  check("CompanyName", "Please Provide Company Name").not().isEmpty(),
  check("CompanyEmail", "Please Provide Company Email").isEmail(),
  check(
    "CompanyPassword",
    "Please Enter a Password with 6 or more characters"
  ).isLength({ min: 6, max: 20 }),
]

// # Register New User
Router.post("/", ValidateRequestBody, async (req, res) => {
  // - Pass request body into validation checks to start validate
  const Errors = validationResult(req)
  // - if any validation Error then response with errors
  if (!Errors.isEmpty()) {
    return res.status(400).json({ Errors: Errors.errors.map(err => err.msg) })
  }

  // - extract JSON data from request body
  const { CompanyId, CompanyName, CompanyEmail, CompanyPassword } = req.body

  // - Create new instance from a Company model
  const company = new Company({
    CompanyId,
    CompanyName,
    CompanyEmail,
    CompanyPassword,
  })

  // - Hash the plain Text Password
  company.CompanyPassword = await bcrypt.hash(CompanyPassword, 10)

  // - Save Data into the Database
  let data = await company.save()

  // - response with save confirmation
  res.status(200).json({
    message: "Company Saved Successfully",
    data,
  })
})

module.exports = Router
