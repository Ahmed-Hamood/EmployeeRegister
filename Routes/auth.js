const express = require("express")
const Router = express.Router()

// Get Login User  - Private
Router.get("/", (req, res) => {
  res.send("Get Login User")
})

// User Auth And Get Token - Public
Router.post("/", (req, res) => {
  res.send("Authenticate and Sign A JWT")
})

module.exports = Router
