require("dotenv").config();
const passport = require('passport');
const local = require('./localStrategy'); // 로컬서버로 로그인할때
const naver = require('./naverStrategy'); // 네이버서버로 로그인할때
 
 
const {navers} = require('../models');

module.exports = () => {
passport.serializeUser((req,user, done) => {
 done(null,user);

});

passport.deserializeUser((id, done) => {
navers.findOne({ where: { id } })
.then(user => done(null, user))
.catch(err => done(err));
});

local();
naver(); // 네이버 전략 등록
};