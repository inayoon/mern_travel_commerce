const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    //check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Auth failed, email not found");
    }

    //check if the password is correct
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("Wrong credentials");
    }

    const payload = {
      userId: user._id.toHexString(),
    };

    //generate the token
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
