const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

let auth = async (req, res, next) => {
  //get the token from request headers
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  try {
    //verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode.userId });
    if (!user) {
      return res.status(400).send("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
