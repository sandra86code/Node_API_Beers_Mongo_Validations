const express = require('express')
const router = express.Router()

const { getLogin } = require('../controllers/login')

const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')


router.post('/login',[
    check('Email','Email is invalid').isEmail(),
    check('Password', 'Password is mandatory').not().isEmpty(),
    validateFields
], getLogin)

module.exports = router

