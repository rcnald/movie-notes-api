const knex = require("../database/knex")
const ClientError = require("./ClientError")
const bcrypt = require('bcrypt');

const isEmailTaken = async (email) => {
  const result = await knex('users').select().where({email})

  return result.length > 0
}

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email)
}

const middlewareError = (err, req, res, next) => {
  if(err instanceof ClientError){
    return res.status(err.status).json({
      status:"error",
      message: err.message
    })
  }

  return res.status(500).json({
    status:"error",
    message: "Internal server error"
  })
}

const hashPassword = async (password) => {
  const salt = 10
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

module.exports = {
  isEmailTaken,
  isEmailValid,
  middlewareError,
  hashPassword
}