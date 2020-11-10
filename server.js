const express = require("express")
const app = express()
const Port = process.env.PORT || 3000
const DB_Connect = require('./DB')
 
const auth = require("./Routes/auth")
const company = require("./Routes/company")
const employee = require("./Routes/employee");

// - Connecting to the Database
DB_Connect();

app.use(express.json())


app.use("/api/auth", auth)
app.use("/api/company", company)
app.use("/api/employee", employee)

app.listen(Port, () => console.log(`Server is Running on port ${Port}`))
