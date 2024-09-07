const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
// Bearer e21dawa2d1
// profile data token
const auth = async (req, res, next) => {
  //check headers
  const authHeader = req.headers.authorization;
  console.log(authHeader,'authHeader')
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Not Authorized");
  }
  console.log(authHeader,"hereeee")
  
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not Authorized");
  }
};

module.exports = auth;