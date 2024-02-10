const { Router } = require("express")
const sessionRoutes = require("./session.routes")
const usersRoutes = require("./users.routes")
const movieNotesRoutes = require("./movie_notes.routes")
const movieTagsRoutes = require("./movie_tags.routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/notes", movieNotesRoutes)
routes.use("/tags", movieTagsRoutes)
routes.use("/session", sessionRoutes)

module.exports = routes