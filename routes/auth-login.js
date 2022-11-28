const express = require('express')
const router = express.Router()

const { getLogin } = require('../controllers/auth-login')

const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')


router.post('/',[
    check('Email','Email is invalid').isEmail(),
    check('Password', 'Password is mandatory').not().isEmpty(),
    validateFields
], getLogin)

module.exports = router