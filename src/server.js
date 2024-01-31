require("express-async-errors")
const express = require("express")
const routes = require("./routes")
const { middlewareError } = require("./utils/utils")

const app = express()

app.use(express.json())
app.use(routes)
app.use(middlewareError)

app.listen(process.env.PORT, () => {
  return console.log(`✅ listen to port: ${process.env.PORT}`)
})