const jwt = require('jsonwebtoken');
const { Users } = require('../models');
require('dotenv').config();


module.exports = async (req, res, next) => {
    const { authorization } = req.headers;  //headers는 인증을 날려주는 역할이다
    //console.log("authorization", authorization)
    const [authType, authToken] = (authorization || '').split(' '); //authorization을 split으로 띄어쓰기로 나눠주고 authType, authToken에 순서대로 나눠준다.
    // console.log(authType, authToken)

    if (!authToken || authType !== 'Bearer') {  //인증이 안되면 빈칸으로 날라오고 authToken값이 다르거나 authType값이 Bearer이 아니면 로그인이 필요합니다.
        res.status(401).send({
            errorMessage: '로그인이 필요합니다.',
        });
        return;
    }

    try {
        //검증 ( userId만 필요)
        // const { userId } = jwt.verify(authToken, process.env.SECRETKEY); //jwt의 verify(확인해주는것)메소드를 사용(⭐userId 말고 userName 등등 담아서 보내면 payload에서 까볼 수 있음⭐)
        // console.log(userId)
        //  console.log("토큰 오픈", jwt.verify(authToken))

        const {userId} = jwt.verify(authToken, process.env.SECRETKEY);
        const user = await Users.findAll({where : {userId}})
        res.locals.user = user[0].dataValues;
        next();
    } catch (err) {
        res.status(401).send({
            errorMessage: "로그인이 필요한 기능입니다.",
        });
        console.log(`${err.name} : ${err.message}`);
    }
};
