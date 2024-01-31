const ClientError = require("../utils/ClientError")
const knex = require("../database/knex")
const { checkEmail, hashPassword } = require("../utils/utils")

class UsersController{
  async create(req, res){
    const { name, email, password } = req.body

    await checkEmail(email)
    
    const hashedPassword = await hashPassword(password)
    
    await knex('users').insert({email, name, password: hashedPassword});
    
    return res.status(201).json()
  }
}

module.exports = UsersController