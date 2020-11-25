const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
  },
  Staffid: {
    type: String,
    requires: true,
  },
  Name: {
    type: String,
    requires: true,
  },
  Gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  Email: {
    type: String,
    requires: true,
  },
  Nationality: {
    type: String,
  },
  MobilePhone: {
    type: String,
    requires: true,
  },
  EmployeeCategory: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D"],
  },
  DateOfJoin: {
    type: String,
    requires: true,
  },
  EmployeeSalary: {
    type: Number,
    required: true,
  },
  Created_Date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model("Employee", EmployeeSchema)
