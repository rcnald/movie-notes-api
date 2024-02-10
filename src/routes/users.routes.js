const { Router } = require("express")
const usersRouter = Router()
const UsersController = require("../controllers/users.controller")
const UsersAvatarController = require("../controllers/users-avatar.controller")
const usersController = new UsersController()
const usersAvatarController = new UsersAvatarController()
const multer = require("multer")
const uploadConfigs = require("../configs/upload")

const upload = multer(uploadConfigs.MULTER)

usersRouter.post("/", usersController.create)
usersRouter.put("/", usersController.update)
usersRouter.delete("/", usersController.delete)
usersRouter.patch("/avatar", upload.single("avatar"), usersAvatarController.update)

module.exports = usersRouter