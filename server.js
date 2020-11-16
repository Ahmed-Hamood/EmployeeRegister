const express = require("express")
const app = express()
const dotenv = require("dotenv")
const DB_Connect = require("./DB")

const Port = process.env.PORT || 3000
// - Set Env from config.env
dotenv.config({ path: "./config.env" })

const company = require("./Routes/company")
const employee = require("./Routes/employee")

// - Connecting to the Database
DB_Connect()

app.use(express.json())

app.use("/api/company", company)
app.use("/api/employee", employee)

app.listen(Port, () => console.log(`Server is Running on port ${Port}`))
