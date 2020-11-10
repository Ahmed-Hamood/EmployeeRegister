const express = require("express")
const Router = express.Router()

// Get All Employees - Private
Router.get("/", (req, res) => {
  res.send("Get All Employees")
})

// Add New Employee - Private
Router.post("/", (req, res) => {
  res.send("Add New Employees")
})

// Update An Employee - Private
Router.post("/", (req, res) => {
  res.send("Update An Employees")
})

// Delete an Employee - Private
Router.delete("/:id", (req, res) => {
  res.send("Delete An Employee")
})

module.exports = Router
