const express = require("express")
const Router = express.Router()
const { check } = require("express-validator")
const AuthController = require("../Controllers/Company/AuthController")
const CompanyController = require("../Controllers/Company/CompanyController")

const ValidateRegister = [
  check("CompanyId")
    .exists()
    .withMessage("Invalid Request")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please Provide Company ID")
    .bail()
    .isNumeric()
    .withMessage("Company ID only should contain Numbers"),
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

const ValidateLogin = [
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

// # Register New Company And Get Token
Router.post("/auth/signup", ValidateRegister, AuthController.RegisterCompany)

// # Login Company -  Authenticate Company And Get Token - Access Public
Router.post("/auth/login", ValidateLogin, AuthController.LoginCompany)

// # Get Company ( Protect Route ) - Authorize Token - Decode into req.company - Then Get Company by req.company.id
Router.get("/", AuthController.ProtectAccess, CompanyController.GetCompany)

module.exports = Router
