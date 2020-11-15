const express = require("express")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Company = require(".././Models/Company")
const AuthController = require(".././Controllers/AuthController")
const Router = express.Router()

let ValidateRequestBody = [
  check("CompanyId")
    .exists()
    .withMessage("Invalid Request")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please Provide Company ID")
    .bail()
    .isNumeric()
    .withMessage("Company ID only Numbers"),
  // #######################################################################
  check("CompanyName")
    .exists()
    .withMessage("Invalid Request")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please Provide Company Name")
    .bail()
    .isString()
    .withMessage("Invalid Company Name"),
  // #######################################################################
  check("CompanyEmail")
    .exists()
    .withMessage("Invalid Request")
    .trim()
    .notEmpty()
    .withMessage("Please Provide Company Email")
    .bail()
    .isEmail()
    .withMessage("Invalid Email Address")
    .normalizeEmail(),
  // #######################################################################
  check("CompanyPassword")
    .exists()
    .withMessage("Invalid Request")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please Provide Company Password")
    .bail()
    .isLength({ min: 6, max: 20 })
    .withMessage("Please Enter a Password with 6 or more characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/, "i")
    .withMessage("wrong format Password"),
  // #######################################################################
  check("ConfirmPassword")
    .exists()
    .withMessage("Invalid Request")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please confirm your password")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.CompanyPassword) {
        return false
      }
      return true
    })
    .withMessage("Passwords do not match"),
]

// # Register New User

Router.post("/", ValidateRequestBody, async (req, res) => {
  // - Pass request body into validation checks to start validate
  const Errors = validationResult(req)
  let response = {}
  let statusCode = null
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
    await company.save()

    // - Generate Json Web Token and send it in json response
    const Token = await AuthController.GenerateToken(company.id)
    // - set status code & response with Success
    statusCode = 200
    response = {
      message: "Company Registered Successfully",
      Company_Id: company.CompanyId,
      Company_Name: company.CompanyName,
      Company_Email: company.CompanyEmail,
      Token,
    }
  } catch (error) {
    // - response with Error
    statusCode = 400
    response = {
      message: "Database Error ....",
    }
  }
  res.status(statusCode).json(response)
})

module.exports = Router
