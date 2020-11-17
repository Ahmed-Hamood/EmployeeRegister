const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const { promisify } = require("util")
const Company = require("../../Models/Company")

const GenerateToken = async id => {
  return await promisify(jwt.sign)(
    { company: { id } },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  )
}

const VerifyToken = async token => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET)
}

// ####################################################

// - Create/Register New Company
exports.RegisterCompany = async (req, res) => {
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
    const Token = await GenerateToken(company.id)
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
}

// - Login/SignIn into Exist Company
exports.LoginCompany = async (req, res) => {
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
    const token = await GenerateToken(company.id)

    statusCode = 200
    response = {
      message: `Welcome ${company.CompanyName}`,
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
}

// - Authorize/Allowed Protect Access
exports.ProtectAccess = async (req, res, next) => {
  // - Get Token from Header
  const Token = req.header("x-auth-token")
  // - if there no token in header then response
  if (!Token) {
    return res.status(401).json({
      msg: "Token Not Available - Authorization Denied",
    })
  }

  try {
    // - verify token
    const decode = await VerifyToken(Token)
    // store company info inside req.company
    req.company = decode.company
    // - Access Allowed to the next route
    next()
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid Token...",
    })
  }
}
