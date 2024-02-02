const { Router } = require("express")
const movieTagsRouter = Router()
const MovieTagsController = require("../controllers/movie_tags.controller")
const movieTagsController = new MovieTagsController()

movieTagsRouter.get("/:user_id", movieTagsController.index)

module.exports = movieTagsRouter