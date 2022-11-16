const express = require('express')
const router = express.Router()

const {getBars, getBar, addBar, deleteBar, editBar} = require('../controllers/bares')

const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')
const { isBarNameUnique, isBarAddressUnique, isBarPhoneUnique } = require('../helpers/db-validators')

router.get('/', getBars)
router.get('/:id', getBar)
router.post('/', [
    check('Nombre', 'Nombre is mandatory').not().isEmpty(),
    check('Nombre').custom(isBarNameUnique),
    check('Nombre', 'Nombre must have between 2 and 25 characters').isLength({ min: 2, max: 25 }),
    check('Direccion', 'Direccion is mandatory').not().isEmpty(),
    check('Direccion').custom(isBarAddressUnique),
    check('Direccion', 'Direccion must have between 5 and 240 characters').isLength({min: 4, max: 70 }),
    check('Ciudad', 'Ciudad must have between 2 and 40 characters').isLength({ min: 2, max: 40 }),
    check('Telefono', 'Telefono is mandatory').not().isEmpty(),
    check('Telefono').custom(isBarPhoneUnique),
    check('Telefono', 'Telefono must have between 7 and 14 characters').isLength({ min: 7, max: 14 }),
    validateFields
], addBar)
router.delete('/:id', deleteBar)
router.put('/:id', [
    check('Ciudad', 'Ciudad must have between 2 and 40 characters').isLength({ min: 2, max: 40 }),
    check('Telefono', 'Telefono is mandatory').not().isEmpty(),
    check('Telefono', 'Telefono must have between 7 and 14 characters').isLength({ min: 7, max: 14 }),
], editBar)

module.exports = router