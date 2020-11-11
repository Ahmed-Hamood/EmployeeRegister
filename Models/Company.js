const mongoose = require("mongoose")

const CompanySchema = new mongoose.Schema({
  CompanyId: {
    type: String,
    require: true,
  },
  CompanyName: {
    type: String,
    require: true,
  },
  CompanyEmail: {
    type: String,
    require: true,
    unique: true,
  },
  CompanyPassword: {
    type: String,
    require: true,
  },
  CompanyDataOfJoin: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model("Company", CompanySchema)
