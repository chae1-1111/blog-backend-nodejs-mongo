const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

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

const testRouter = express.Router();
testRouter.route("/").get((req, res) => {
    res.writeHead("200", { "content-type": "text/html;charset=utf8" });
    res.write("<h2 style='text-align: center'>테스트 페이지 입니다.</h2>");
    res.write("<p style='text-align: center'>찾아와주셔서 감사합니다.</p>");
    res.end();
});
testRouter.use(cors());

app.use("/test", testRouter);

app.listen(port, () => {
    console.log(`${port}포트 서버 실행중...`);
});
