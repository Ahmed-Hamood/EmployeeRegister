const express = require("express")
const Router = express.Router()

// Register New User
Router.post("/", (req, res) => {
  res.send("Register A New User")
})

module.exports = Router
