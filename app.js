const express = require('express');
const Http = require('http');
const routes = require('./routes');
const cors = require('cors');


const dotenv = require('dotenv')
dotenv.config()


const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 5500;
const path = require('path');

//passport
const passport = require("passport");
const passportConfig = require("./passport");
const session = require('express-session');

// 네이버 때문에 local연결하기 위해 만든 ejs ( npm install ejs --save )

app.set("view engine", "ejs");
app.set("views", "./views");
app.get("/", (req, res) => {
  res.render("naver_login");
});

app.get("/login", (req, res) => {
  res.render("naver_callback");
});
const auth = require('./routes/naver');

passportConfig();
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) =>{
//     User.findOne({ where: { id }})
//         .then(user => done((null, user.id)))
//         .catch(err => done(err));
// })


app.use(session({
    resave:false,
    saveUninitialized:false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
    cors({
        origin: '*',
    })
);
app.use('/', routes);

http.listen(port, () => {
    console.log(`★열려라 서버~~~~~!!!★ : port ${port}`);
});



module.exports = http;