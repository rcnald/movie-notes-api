const ClientError = require("../utils/ClientError")
const knex = require("../database/knex")
const authConfig = require("../configs/auth");
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");

class SessionController{
  async create(req, res){
    const { email, password } = req.body

    const [ user ] = await knex('users').where({email})

    if(!user){
      throw new ClientError("Email ou/e senha incorretos!",401)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
      throw new ClientError("Email ou/e senha incorretos!",401)
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn: expiresIn,
    });

    return res.json({ user, token });
  }
} 

module.exports = SessionController