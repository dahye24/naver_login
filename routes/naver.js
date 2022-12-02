const express = require("express");
const router = express.Router();
// const axios = require("axios");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const CLIENT_id = process.env.NAVER_CLIENT_id;
// const CLIENT_secret = process.env.NAVER_CLIENT_secret;
// const REDIRECT_URL = "http://localhost:5500/auth/naver/callback";
// //const REDIRECT_URL = "https://spots-fe.vercel.app/auth/naver/callback";
// const { Users } = require("../models");

// router.get("/naver_callback", function (req, res) {
//   let api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id= ${CLIENT_id}&client_secret=${CLIENT_secret}&redirect_uri=${REDIRECT_URL}&state=callback_state`;
// //   const naver_api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${Naver.client_id}&redirect_uri=${Naver.redirectURI}&state=${Naver.state}`
//   let access_token;
//   let refresh_token;
//   let email;
//   let domain = "naver";

//   axios({
//     method: "get",
//     url: api_url,
//     headers: {
//       "X-Naver-Client-Id": CLIENT_id,
//       "X-Naver-Client-Secret": CLIENT_secret,
//     },
//   })
//     //then(res => console.log(res))
//     .then((ans) => {
//       return axios({
//         method: "get",
//         url: "https://openapi.naver.com/v1/nid/me",
//         headers: {
//           Authorization: ans.data.token_type + " " + ans.data.access_token,
//         },
//       });
//     });
// });

// router.get('/naver_callback', function (req, res) {

//     const CLIENT_id = process.env.NAVER_CLIENT_id;
//     const CLIENT_secret = process.env.NAVER_CLIENT_secret;
//     const REDIRECT_URL = "http://localhost:5500/auth/naver/callback";
//     let code = req.query.code;
//     let callback_state = req.query.state;
  
//     let api_url = `'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
//       + ${CLIENT_id} + '&client_secret=' + ${CLIENT_secret} + '&redirect_uri=' + ${REDIRECT_URL} + '&code=' + code + '&state=' + callback_state`;
//     axios({
//       method: 'get',
//       url: api_url,
//       headers: {
//         'X-Naver-Client-Id': CLIENT_id,
//         'X-Naver-Client-Secret': CLIENT_secret
//       }
//     })
//       .then(ans => {
//         return axios({
//           method: 'get',
//           url: 'https://openapi.naver.com/v1/nid/me',
//           headers: {
//             Authorization: ans.data.token_type + ' ' + ans.data.access_token
//           }
//         })
//     })
// });


// passport =======================================================================================================

const passport = require("passport");

//* 네이버로 로그인하기 라우터 ***********************
router.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));

//? 위에서 네이버 서버 로그인이 되면, 네이버 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
router.get(
   '/naver/callback',
   //? 그리고 passport 로그인 전략에 의해 naverStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
   passport.authenticate('naver', { failureRedirect: '/' }),  //로그인이 안됐을때
   (req, res) => {
      res.redirect('/login');   //로그인이 됐을때
   },
);





module.exports = router;

