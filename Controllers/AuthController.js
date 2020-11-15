const jwt = require("jsonwebtoken")
const { promisify } = require("util")

exports.GenerateToken = async id => {
  return await promisify(jwt.sign)(
    { company: { id } },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  )
}
