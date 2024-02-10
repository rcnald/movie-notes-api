const { Router } = require("express")
const movieNotesRouter = Router()
const MovieNotesController = require("../controllers/movie_notes.controller")
const movieNotesController = new MovieNotesController()

movieNotesRouter.post("/", movieNotesController.create)
movieNotesRouter.get("/:id", movieNotesController.show)
movieNotesRouter.delete("/:id", movieNotesController.delete)
movieNotesRouter.get("/", movieNotesController.index)

module.exports = movieNotesRouter