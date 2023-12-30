const express = require("express");
const path = require("path");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World");
});
//절대 경로를 사용하기 위해서 path 를 씀
// ../upload로 하는 이유는 ../이 없을 경우 src폴더안에 uploads를 찾게됨
app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
