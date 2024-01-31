const ClientError = require("../utils/ClientError")
const knex = require("../database/knex")
const { isEmailTaken, isEmailValid, hashPassword } = require("../utils/utils")

class UsersController{
  async create(req, res){
    const { name, email, password } = req.body
    const emailExists = await isEmailTaken(email)
    const emailValid = isEmailValid(email)

    if(!emailValid){
      throw new ClientError("Email não esta em um formato valido!")
    }

    if(emailExists){
      throw new ClientError("Email já esta em uso!")
    }

    const hashedPassword = await hashPassword(password)

    await knex('users').insert({email, name, password: hashedPassword});

    return res.status(201).json()
  }
}

module.exports = UsersController