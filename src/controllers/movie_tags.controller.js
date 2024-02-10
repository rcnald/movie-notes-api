const ClientError = require("../utils/ClientError")
const knex = require("../database/knex")

class MovieNotesController{
  async index(req, res){
    const { id:user_id } = req.user

    const userTags = await knex("movie_tags").where({ user_id }) 
    return res.json({userTags})
  }
} 

module.exports = MovieNotesController