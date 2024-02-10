const { Router } = require("express")
const sessionRoutes = require("./session.routes")
const usersRoutes = require("./users.routes")
const movieNotesRoutes = require("./movie_notes.routes")
const movieTagsRoutes = require("./movie_tags.routes")
const { authMiddleware } = require("../middlewares")

const routes = Router()

routes.use("/session", sessionRoutes)
routes.use("/users", usersRoutes)

routes.use(authMiddleware)

routes.use("/notes", movieNotesRoutes)
routes.use("/tags", movieTagsRoutes)

module.exports = routes