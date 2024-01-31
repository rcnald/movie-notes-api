const { Router } = require("express")
const movieNotesRouter = Router()
const MovieNotesController = require("../controllers/movie_notes.controller")
const movieNotesController = new MovieNotesController()

movieNotesRouter.post("/:user_id", movieNotesController.create)
movieNotesRouter.get("/:id", movieNotesController.show)
movieNotesRouter.delete("/:id", movieNotesController.delete)

module.exports = movieNotesRouter