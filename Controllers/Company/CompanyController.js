const Company = require("../../Models/Company")

exports.GetCompany = async (req, res) => {
  console.log("sssssssssssssssssssssssssss")
  try {
    const company = await Company.findById(req.company.id).select(
      "-CompanyPassword -__v"
    )
    return res.status(200).json(company)
  } catch (error) {
    return res.status(401).json({
      msg: "Server Error ....",
    })
  }
}
