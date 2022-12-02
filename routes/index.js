const express = require('express');
const router = express.Router();
const naverRouter = require("./naver");



router.use(express.json());
router.use("/naver", naverRouter);



module.exports = router;
