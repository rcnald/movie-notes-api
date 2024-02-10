require("express-async-errors")
const express = require("express")
const routes = require("./routes")
const { errorMiddleware, authMiddleware } = require("./middlewares")

const app = express()

app.use(express.json())
app.use(authMiddleware)
app.use(routes)
app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  return console.log(`✅ HTTP server listen to port: ${process.env.PORT}`)
})