const Company = require("../../Models/Company")

exports.GetCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.company.id).select(
      "CompanyEmail CompanyId CompanyName Added_Date"
    )
    return res.status(200).json({
      id: company.id,
      CompanyEmail: company.CompanyEmail,
      CompanyId: company.CompanyId,
      CompanyName: company.CompanyName,
      AddedDate: company.Added_Date
    })
  } catch (error) {
    return res.status(401).json({
      errors: ["Server Error ...."],
    })
  }
}


exports.UpdateCompany = async (req, res) => {
  
}