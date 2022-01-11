const mysql = require("mysql");
const config = require("../config.json");

const pool = mysql.createPool(config);

const boardCont = {};

// 새로운 글 등록
boardCont.post = function (userkey, name, title, description, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("DB 연결 성공!");
            const sql = conn.query(
                "insert into board(userkey, name, title, description) values(?, ?, ?, ?);",
                [userkey, name, title, description],
                (err, result) => {
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, true);
                    }
                }
            );
        }
    });
};

// 리스트 반환
boardCont.getList = function (userkey, page, sortType, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("DB 연결 성공!");
            var queryString =
                "select postkey, title, name, date_format(posttime, '%Y-%m-%d %T') posttime, date_format(modifytime, '%Y-%m-%d %T') modifytime from board where userkey = ? order by " +
                sortType +
                " desc limit ?, ?";
            const sql = conn.query(
                queryString,
                [userkey, 10 * (page - 1), 10],
                (err, result) => {
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        if (result.length == 0) {
                            callback(null, null);
                        } else {
                            callback(null, result);
                        }
                    }
                }
            );
        }
    });
};

boardCont.getLength = (userkey, callback) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("DB 연결 성공!");
            var queryString =
                "select count(postkey) count from board where userkey = ?";
            const sql = conn.query(queryString, [userkey], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result[0].count);
                }
            });
        }
    });
};

// 상세 정보 반환
boardCont.getDetail = function (postkey, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("DB 연결 성공!");
            const sql = conn.query(
                "select userkey, title, description, name, date_format(posttime, '%Y-%m-%d %T') posttime, date_format(modifytime, '%Y-%m-%d %T') modifytime from board where postkey = ?",
                postkey,
                (err, result) => {
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        if (result.length == 0) {
                            callback(null, null);
                        } else {
                            callback(null, result[0]);
                        }
                    }
                }
            );
        }
    });
};

// 수정하기
boardCont.modify = function (userkey, postkey, title, description, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("DB 연결 성공!");
            const sql = conn.query(
                "update board set title = ?, description = ? where userkey = ? and postkey = ?",
                [title, description, userkey, postkey],
                (err, result) => {
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        if (result.changedRows == 0) {
                            callback(null, null);
                        } else {
                            callback(null, result);
                        }
                        return;
                    }
                }
            );
        }
    });
};

// 삭제하기
boardCont.delete = function (userkey, postkey, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("DB 연결 성공!");
            const sql = conn.query(
                "delete from board where userkey = ? and postkey = ?;",
                [userkey, postkey],
                (err, result) => {
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        console.log(result);
                        if (result.affectedRows == 0) {
                            callback(null, null);
                        } else {
                            callback(null, result);
                        }
                        return;
                    }
                }
            );
        }
    });
};

module.exports = boardCont;
