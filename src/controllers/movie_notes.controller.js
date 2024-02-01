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

  async index(req, res){
    const { title, user_id, tags } = req.query

    let notes

    if(tags){
      const tagsInArray = tags.split(',').map(name => name.trim())

      notes = await knex("movie_tags")
      .select([
        "movie_notes.id",
        "movie_notes.title",
        "movie_notes.description",
        "movie_notes.rating",
        "movie_notes.user_id",
      ])
      .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name",tagsInArray)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
        .orderBy("movie_notes.title")
    } else{
      notes = await knex("movie_notes").select(["id","title","description", "rating", "user_id"]).where({user_id})
    }

    const userTags = await knex("movie_tags").where({ user_id })
    notes = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })
     
    return res.json({notes})
  }
} 

module.exports = MovieNotesController