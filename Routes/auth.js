const express = require("express")
const Router = express.Router()
const Company = require(".././Models/Company")
const AuthController = require(".././Controllers/AuthController")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

let ValidateRequestBody = [
  check("CompanyEmail")
    .trim()
    .notEmpty()
    .withMessage("Please Provide Company Email")
    .bail()
    .isEmail()
    .withMessage("Invalid Email Address")
    .normalizeEmail(),
  // #####################################################
  check("CompanyPassword")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please Provide Company Password")
    .bail()
    .isLength({ min: 6, max: 20 })
    .withMessage("Please Enter a Password with 6 or more characters"),
]

// Get Login User  - Private
Router.get("/login", (req, res) => {
  res.send("view Login page")
})

// User login -  Auth user And Get Token - Access Public
Router.post("/login", ValidateRequestBody, async (req, res) => {
  // - Pass request body into validation checks to start validate
  const Errors = validationResult(req)
  let response = {}
  let statusCode = null

  // - if any validation Error then response with errors
  if (!Errors.isEmpty()) {
    return res
      .status(400)
      .json({ Errors: Errors.errors.map(err => err.param + ": " + err.msg) })
  }

  const { CompanyEmail, CompanyPassword } = req.body

  try {
    const company = await Company.findOne({ CompanyEmail })
    // - if Email does not exist then response
    if (!company) {
      return res.status(400).json({
        msg: "Invalid Credential - Please check either your Email or Password",
      })
    }

   // - compare and confirm password
    const pass = await bcrypt.compare(CompanyPassword, company.CompanyPassword)

   // - if password does not match the password from database then response with an error
    if (!pass) {
      return res.status(400).json({
        msg: "Invalid Credential - Please check either your Email or Password",
      })
    }

  // - Generate Json Web Token and send it in json response
    const token = await AuthController.GenerateToken(company.id)

    statusCode = 200
    response = {
      message: "Company Registered Successfully",
      Company_Id: company.CompanyId,
      Company_Name: company.CompanyName,
      Company_Email: company.CompanyEmail,
      token,
    }
  } catch (error) {
    statusCode = 400
    response = {
      message: "Database Error ....",
    }
  }

  res.status(statusCode).json(response)
})

module.exports = Router
