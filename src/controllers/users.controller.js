const ClientError = require("../utils/ClientError")
const knex = require("../database/knex")
const { checkEmail, checkPassword, hashPassword } = require("../utils/utils")

class UsersController{
  async create(req, res){
    const { name, email, password } = req.body

    await checkEmail(email)
    
    const hashedPassword = await hashPassword(password)
    
    await knex('users').insert({email, name, password: hashedPassword});
    
    return res.status(201).json()
  }

  async update(req, res){
    const { name, email, password, old_password } = req.body
    const { id } = req.params

    const [ user ] = await knex("users").select().where({id})

    if(!user){
      throw new ClientError("usuário não encontrado!")
    }

    const nameOrEmailChanged = (name !== user.name ) || (email !== user.email)

    if(!nameOrEmailChanged && !password){
      return res.json({message:"não houveram mudanças!"})
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    
    await checkEmail(user.email, id)
    await checkPassword(password, old_password, id)

    const passwordChanged = password !== old_password

    if(!passwordChanged && password){
      throw new ClientError("você não pode redefinir sua nova senha, com sua senha atual!")
    }

    const hashedPassword = await hashPassword(password)

    user.password = hashedPassword ?? user.password

    await knex("users").update({
      name : user.name,
      email : user.email,
      password : user.password,
      updated_at: knex.fn.now()
    }).where({id})

    res.json({message: "Usuário atualizado com sucesso!"})
  }
}

module.exports = UsersController