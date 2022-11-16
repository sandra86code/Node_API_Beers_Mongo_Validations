const express = require('express')
const router = express.Router()

const {getUsers, getUser, addUser, deleteUser, editUser} = require('../controllers/usuarios')

const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')
const { isEmailUnique, isNickUnique, isValidRol } = require('../helpers/db-validators')


router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/',[
    check('Nick', 'Nick is mandatory').not().isEmpty(),
    check('Nick').custom(isNickUnique),
    check('Nick', 'Nick must have between 3 and 25 characters').isLength({min: 3, max: 25}),
    check('Password', 'Password is mandatory').not().isEmpty(),
    check('Password', 'Password must have between 5 and 35 characters').isLength({ min: 5, max: 35 }),
    check('Email', 'Email is mandatory').not().isEmpty(),
    check('Email','Email is invalid').isEmail(),
    check('Email').custom(isEmailUnique),
    check('Nombre','Nombre is mandatory').not().isEmpty(),
    check('Nombre', 'Nombre must have between 2 and 40 characters').isLength({ min: 2, max: 40 }),
    check('Apellidos','Apellidos is mandatory').not().isEmpty(),
    check('Apellidos', 'Apellidos must have between 2 and 60 characters').isLength({ min: 2, max: 60 }),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol','rol is mandatory').not().isEmpty(),
    check('rol').custom( isValidRol),
    validateFields
], addUser)
router.delete('/:id', deleteUser)
router.put('/:id', [
    check('Password', 'Password is mandatory').not().isEmpty(),
    check('Password', 'Password must have between 5 and 35 characters').isLength({ min: 5, max: 35 }),
    check('Nombre','Nombre is mandatory').not().isEmpty(),
    check('Nombre', 'Nombre must have between 2 and 40 characters').isLength({ min: 2, max: 40 }),
    check('Apellidos','Apellidos is mandatory').not().isEmpty(),
    check('Apellidos', 'Apellidos must have between 2 and 60 characters').isLength({ min: 2, max: 60 }),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol','rol is mandatory').not().isEmpty(),
    check('rol').custom( isValidRol),
    validateFields
], editUser)

module.exports = router