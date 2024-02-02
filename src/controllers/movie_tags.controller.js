const ClientError = require("../utils/ClientError")
const knex = require("../database/knex")

class MovieNotesController{
  async index(req, res){
    const { user_id } = req.params

    const userTags = await knex("movie_tags").where({ user_id }) 
    return res.json({userTags})
  }
} 

module.exports = MovieNotesController