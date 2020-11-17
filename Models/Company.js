const mongoose = require("mongoose")

const CompanySchema = new mongoose.Schema({
  CompanyId: {
    type: String,
    require: true,
    // unique: true,
  },
  CompanyName: {
    type: String,
    require: true,
  },
  CompanyEmail: {
    type: String,
    require: true,
    // unique: true,
  },
  CompanyPassword: {
    type: String,
    require: true,
  },
  Added_Date: {
    type: Date,
    default: Date.now(),
  },

})

module.exports = mongoose.model("Company", CompanySchema)
