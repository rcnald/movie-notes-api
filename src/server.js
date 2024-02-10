require("express-async-errors")
const uploadConfig = require("./configs/upload")
const { errorMiddleware, authMiddleware } = require("./middlewares")

const express = require("express")
const routes = require("./routes")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
app.use(authMiddleware)
app.use(routes)
app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  return console.log(`✅ HTTP server listen to port: ${process.env.PORT}`)
})