const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 80;

const controllers = require("./controllers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost"], // route53이후 수정
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());
//구현할 때마다 주석처리해주기
app.post('/signup', controllers.signup);
app.post('/signin', controllers.signin);
// app.get('/signout', controllers.signout);
// app.delete('/byebye', controllers.byebye);
// app.get('/user', controllers.userinfo);
// app.get('/list', controllers.getsecret);
app.post('/new', controllers.newsecret);
app.patch('/changepw', controllers.changepw);
app.get('/list/:id', controllers.likecount)

app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});