const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

// 회원 라우터
const memberRouter = require("./router/member");
app.use("/member", memberRouter);

// 포스트 라우터
const boardRouter = require("./router/board");
app.use("/board", boardRouter);

app.listen(port, () => {
    console.log(`${port}포트 서버 실행중...`);
});
