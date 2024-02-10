const jsonwebtoken = require("jsonwebtoken");
const authConfig = require("../configs/auth");
const ClientError = require("../utils/ClientError");

function authMiddleware(req, res, next){
  const auth = req.headers.authorization;

  if (!auth) {
    throw new ClientError("JWT Token não foi informado!", 401);
  }

  const token = auth.split(' ')[1]

  try {
    const { sub: user_id} = jsonwebtoken.verify(token, authConfig.jwt.secret)

    req.user = {
      id: Number(user_id)
    }

    next() 
  } catch (error) {
    if (error instanceof jsonwebtoken.JsonWebTokenError) {
      throw new ClientError("JWT Token informado é invalido!", 401);
    }
  }

}

module.exports = authMiddleware