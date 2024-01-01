const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 4000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});
//절대 경로를 사용하기 위해서 path 를 씀
// ../upload로 하는 이유는 ../이 없을 경우 src폴더안에 uploads를 찾게됨
app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
