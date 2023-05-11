var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render("index", { message: null })
});
router.get("/join", function (req, res) {
  res.render("join", { message: null })
})
router.post("/api/join", async function (req, res) {
  console.log(req.body)
  var [rows] = await connection.query("select * from user where id=?", [req.body.id])
  if (rows.length == 0) { // 중복된 아이디가 없어서 회원가입이 가능함
    var [rows] = await connection.query("insert into user(id,name,email,password) values(?,?,?,?)",
      [req.body.id, req.body.name, req.body.email, req.body.password])

    res.redirect("/")
  }
  else {  // 이미 가입되어 있는 아이디
    res.render("join", { message: "이미 가입된 아이디입니다." })
  }
})
router.post("/api/login", async function (req, res) {
  console.log(req.body)
  var [rows] = await connection.query("select * from user where id=? and password=?",
    [req.body.id, req.body.password])
  console.log(rows)
  if (rows.length == 0) { // 로그인 실패 - 아이디 또는 패스워드가 틀렸을경우
    res.render("index", { message: "아이디 또는 패스워드가 틀렸습니다." })
  }
  else { //로그인 성공
    req.session.user = rows[0]
    res.redirect("/main")
  }
})

router.get("/main", async function (req, res) {
  var [rows] = await connection.query("select * from namecard where userId=?", [req.session.user.id])

  res.render("main", { namecards: rows })
})
router.get("/namecard/create", async function (req, res) {
  res.render("namecard_create")
})

router.post("/api/namecard/create", async function (req, res) {
  console.log(req.body)
  console.log(req.session)
  await connection.query(`insert into namecard(name,company,title,phone,email,address,web,userId)
    values(?,?,?,?,?,?,?,?)`,
    [req.body.name, req.body.company, req.body.title,
    req.body.phone, req.body.email, req.body.address, req.body.web, req.session.user.id])

  res.redirect("/main")
})

module.exports = router;
