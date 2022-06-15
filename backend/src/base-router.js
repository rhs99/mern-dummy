const express = require('express')
const router = require('./users/router')

const userRouter = require('./users/router')

router.use('/user', userRouter);

module.exports = router