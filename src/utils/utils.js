const knex = require("../database/knex")
const ClientError = require("./ClientError")
const bcrypt = require('bcrypt');

const isEmailTaken = async (email, user_id) => {
  const [ user ] = await knex('users').select('id').where({email})

  const isUserEmail =  user?.id === user_id

  return !isUserEmail && user
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

const checkPassword = async (newPassword, currentPassword, user_id) => {
  if(newPassword && !currentPassword){
    throw new ClientError("Para trocar a senha, necessário informa senha atual!")
  }

  if(newPassword && currentPassword){
    const [ user ] = await knex("users").select().where({id: user_id})

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if(!isCurrentPasswordValid){
      throw new ClientError("Senha atual incorreta!")
    }
  }
}

const checkUser = async (id) => {
  const [ user ] = await knex("users").select().where({id})

  if(!user){
    throw new ClientError("usuário não encontrado!")
  }

  return user
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
  checkEmail,
  checkPassword,
  checkUser,
  hashPassword
}