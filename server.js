const express = require("express")
const app = express()
const Port = process.env.PORT || 3000
const DB_Connect = require('./DB')
 
const auth = require("./Routes/auth")
const user = require("./Routes/user")
const employees = require("./Routes/employees");

// - Connecting to the Database
DB_Connect();


app.use("/api/auth", auth)
app.use("/api/staffs", user)
app.use("/api/employees", employees)

app.listen(Port, () => console.log(`Server is Running on port ${Port}`))
