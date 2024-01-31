const ClientError = require("../utils/ClientError")
const knex = require("../database/knex")
const { isEmailTaken } = require("../utils/utils")

class UsersController{
  async create(req, res){
    const { name, email, password } = req.body
    const emailExists = await isEmailTaken(email)

    if(emailExists){
      throw new ClientError("Email já esta em uso!")
    }

    await knex('users').insert({email, name, password});

    return res.status(201).json()
  }
}

module.exports = UsersController