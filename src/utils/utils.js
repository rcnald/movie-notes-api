const knex = require("../database/knex")
const ClientError = require("./ClientError")

const isEmailTaken = async (email) => {
  const result = await knex('users').select().where({email})

  return result.length > 0
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

module.exports = {
  isEmailTaken,
  middlewareError
}