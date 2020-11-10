const express = require("express")
const { check, validationResult } = require("express-validator")
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

// Register New User
Router.post("/", ValidateRequestBody, (req, res) => {
  const Errors = validationResult(req)
  if (!Errors.isEmpty()) {
    return res.status(400).json({ Errors: Errors.errors.map(err => err.msg) })
  }

  res.send("Register New Company")
})

module.exports = Router
