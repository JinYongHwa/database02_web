var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render("index")
});
router.get("/join", function (req, res) {
  res.render("join")
})
router.post("/api/join", function (req, res) {
  console.log(req.body)
  var [rows] = await connection.query("select * from user where id=?", [req.body.id])
  if (rows.length == 0) { // 중복된 아이디가 없어서 회원가입이 가능함
    var [rows] = await connection.query("insert into user(id,name,email,password) values(?,?,?,?)",
      [req.body.id, req.body.name, req.body.email, req.body.password])

  }
  else {

  }


  // connection.query("select * from user where id=?", [req.body.id], function (err, rows) {
  //   console.log(err, rows)
  //   if (rows.length == 0) { // 중복된 아이디가 없어서 회원가입이 가능함
  //     connection.query("insert into user(id,name,email,password) values(?,?,?,?)",
  //       [req.body.id, req.body.name, req.body.email, req.body.password], function (err, rows) {

  //       })
  //   }
  //   else { //이미 가입되어 있는 아이디

  //   }

})
})

module.exports = router;
