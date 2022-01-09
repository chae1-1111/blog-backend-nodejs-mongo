const boardCont = require("../controller/board");

const cors = require("cors");

var express = require("express"),
    router = express.Router();

router.use(cors());

// 새로운 글 작성
router.route("/post").post((req, res) => {
    const userkey = req.body.userkey;
    const name = req.body.name;
    const title = req.body.title;
    const description = req.body.description;

    console.log(req.body);

    const resultJson = {};

    boardCont.post(userkey, name, title, description, (err, result) => {
        if (err) {
            console.log(err);
            resultJson.result = 400;
            resultJson.resultMsg = err;
        } else {
            if (result) {
                resultJson.result = 200;
                resultJson.resultMsg = "포스팅 성공";
            } else {
                resultJson.result = 201;
                resultJson.resultMsg = "포스팅 실패";
            }
        }
        res.status(resultJson.result).json(resultJson);
    });
});

// 글 목록 반환
router.route("/list").post((req, res) => {
    const userkey = req.body.userkey;
    const page = req.body.page;
    const sortType = req.body.sortType;

    const resultJson = {
        result: null,
        resultMsg: "",
        list: [],
    };

    boardCont.getList(userkey, page, sortType, (err, result) => {
        if (err) {
            console.log(err);
            resultJson.result = 400;
            resultJson.resultMsg = err;
        } else {
            if (result != null) {
                result.map(function (post, index) {
                    resultJson.result = 200;
                    resultJson.resultMsg = "리스트 조회 성공";
                    resultJson.list[index] = post;
                });
            } else {
                resultJson.result = 201;
                resultJson.resultMsg = "리스트 조회 실패";
            }
        }
        res.status(resultJson.result).json(resultJson);
    });
});

// 상세 페이지
router.route("/detail").get((req, res) => {
    const postkey = req.query.postkey;

    const resultJson = {
        result: null,
        resultMsg: "",
        post: {},
    };

    boardCont.getDetail(postkey, (err, result) => {
        if (err) {
            console.log(err);
            resultJson.result = 400;
            resultJson.resultMsg = err;
        } else {
            if (result != null) {
                resultJson.result = 200;
                resultJson.resultMsg = "게시글 조회 성공";
                resultJson.post = result;
            } else {
                resultJson.result = 201;
                resultJson.resultMsg = "게시글 조회 실패";
            }
        }
        res.status(resultJson.result).json(resultJson);
    });
});

// 수정하기
router.route("/modify").post((req, res) => {
    const userkey = req.body.userkey;
    const postkey = req.body.postkey;
    const title = req.body.title;
    const description = req.body.description;

    const resultJson = {
        result: null,
        resultMsg: "",
    };

    boardCont.modify(userkey, postkey, title, description, (err, result) => {
        if (err) {
            console.log(err);
            resultJson.result = 400;
            resultJson.resultMsg = err;
        } else {
            if (result != null) {
                resultJson.result = 200;
                resultJson.resultMsg = "게시글 수정 성공";
            } else {
                resultJson.result = 201;
                resultJson.resultMsg = "게시글 수정 실패";
            }
        }
        res.status(resultJson.result).json(resultJson);
    });
});

// 삭제하기
router.route("/delete").post((req, res) => {
    const userkey = req.body.userkey;
    const postkey = req.body.postkey;

    const resultJson = {
        result: null,
        resultMsg: "",
    };

    boardCont.delete(userkey, postkey, (err, result) => {
        if (err) {
            console.log(err);
            resultJson.result = 400;
            resultJson.resultMsg = err;
        } else {
            if (result != null) {
                resultJson.result = 200;
                resultJson.resultMsg = "게시글 삭제 성공";
            } else {
                resultJson.result = 201;
                resultJson.resultMsg = "존재하지 않는 게시글입니다.";
            }
        }
        res.status(resultJson.result).json(resultJson);
    });
});

module.exports = router;
