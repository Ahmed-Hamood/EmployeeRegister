const express = require("express")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
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
  let response = {}
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

  try {
    // - Hash the plain Text Password
    company.CompanyPassword = await bcrypt.hash(CompanyPassword, 10)

    // - Save Data into the Database
    await company.save();

    // - Generate Json Web Token and send it in json response
    const Token = jwt.sign(
      { id: company.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        // - response with save confirmation And Token
        res.status(200).json({
          message: "Company Saved Successfully",
          Company_Id: company.CompanyId,
          Company_Name: company.CompanyName,
          Company_Email: company.CompanyEmail,
          token,
        })
      }
    )
  } catch (error) {
    // - response with Error
    res.status(400).json({ message: "Database Error ...." })
  }
})

module.exports = Router
