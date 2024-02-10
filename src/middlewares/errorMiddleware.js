const ClientError = require("../utils/ClientError")

const errorMiddleware = (err, req, res, next) => {
  if(err instanceof ClientError){
    return res.status(err.status).json({
      status:"error",
      message: err.message
    })
  }

  return res.status(500).json({
    status:"error",
    message: `internal error: ${err.message}`
  })
}

module.exports = errorMiddleware