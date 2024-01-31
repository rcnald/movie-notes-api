const { Router } = require("express")
const usersRouter = Router()
const UsersController = require("../controllers/users.controller")
const usersController = new UsersController()

usersRouter.post("/", usersController.create)

module.exports = usersRouter