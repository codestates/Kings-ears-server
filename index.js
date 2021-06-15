const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const fs = require("fs");
//const https = require("https");

const app = express();
const port = 80;

const controllers = require("./controllers");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"], // route53이후 수정
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
app.get('/verification', controllers.verifytoken);
app.get('/accesstoken', controllers.refreshaccess);


app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
// let server;
// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(port, () => console.log("server runnning"));

// } else {
//   server = app.listen(port)
// }
// module.exports = server;