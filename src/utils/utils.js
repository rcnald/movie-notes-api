const knex = require("../database/knex")
const ClientError = require("./ClientError")
const bcrypt = require('bcrypt');

const isEmailTaken = async (email, user_id) => {
  const result = await knex('users').select('id').where({email})
  const isUserEmail =  result[0]?.id === user_id

  return !isUserEmail
}

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email)
}

const checkEmail = async (email, user_id) => {
  const emailValid = isEmailValid(email)
    
  if(!emailValid){
    throw new ClientError("Email não esta em um formato valido!")
  }
  
  const emailExists = await isEmailTaken(email, Number(user_id))
  
  if(emailExists){
    throw new ClientError("Email já esta em uso!")
  }
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
  checkEmail,
  middlewareError,
  hashPassword
}