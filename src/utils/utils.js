const knex = require("../database/knex")
const ClientError = require("./ClientError")
const bcrypt = require('bcrypt');

const isEmailTaken = async (email, user_id) => {
  const [ result ] = await knex('users').select('id').where({email})

  const isUserEmail =  result?.id === user_id

  return !isUserEmail && result?.id
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

const checkPassword = async (newPassword, oldPassword, user_id) => {
  if(newPassword && !oldPassword){
    throw new ClientError("Para trocar a senha, necessário informa senha atual!")
  }

  if(newPassword && oldPassword){
    const [ user ] = await knex("users").select().where({id: user_id})

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password)

    if(!isOldPasswordValid){
      throw new ClientError("Senha atual incorreta!")
    }
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
  let hashedPassword = null
  if(password){
    hashedPassword = await bcrypt.hash(password, salt)
  }
  return hashedPassword
}

module.exports = {
  isEmailTaken,
  isEmailValid,
  checkEmail,
  checkPassword,
  middlewareError,
  hashPassword
}