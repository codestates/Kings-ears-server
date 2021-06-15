const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 80;

const controllers = require("./controllers");
const verify = require('./token/verifytoken')
const refresh = require('./token/refreshaccess');
const verify = require('./token/verifytoken');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://kings-ears.s3-website.ap-northeast-2.amazonaws.com"], // route53이후 수정
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());

app.post('/signup', controllers.signup);
app.post('/signin', controllers.signin);
app.get('/signout', controllers.signout);
app.delete('/byebye', controllers.byebye);
app.get('/user', controllers.userinfo);
app.get('/secret', controllers.getsecret);
app.post('/newsecret', controllers.newsecret);
app.patch('/changepw', controllers.changepw);
app.get('/', controllers.landingpage);
app.get('/secret-user-response/:id', controllers.likecount)
app.get('/verification', verify.verifyToken);
app.get('/accesstoken', refresh.refreshaccess);


app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});