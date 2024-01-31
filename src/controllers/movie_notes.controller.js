const ClientError = require("../utils/ClientError")
const knex = require("../database/knex")
const { checkUser } = require("../utils/utils")

class MovieNotesController{
  async create(req, res){
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params

    await checkUser(user_id)

    if(rating > 5){
      throw new ClientError("rating pode ser no máximo 5!")
    }

    const [note_id] =  await knex('movie_notes').insert({title, description, rating: rating ?? 0, user_id});

    const tagsToInsert = tags.map(name =>{
      return {
        name,
        user_id,
        note_id
      }
    })

    await knex("movie_tags").insert(tagsToInsert)

    return res.status(201).json()
  }

  async show(req, res){
    const { id } = req.params

    const [note] = await knex("movie_notes").where({id})
    const tags = await knex("movie_tags").where({note_id:id})

    if(note === undefined){
      throw new ClientError("nota não encontrada!")
    }
    
    return res.json({
      ...note,  
      tags
    })
  }

  async delete(req, res){
    const { id } = req.params

    const [note] = await knex("movie_notes").where({id})

    if(note === undefined){
      throw new ClientError("nota não encontrada!")
    }

    await knex('movie_notes').where('id', id).del();

    res.status(200).json()
  }
} 

module.exports = MovieNotesController