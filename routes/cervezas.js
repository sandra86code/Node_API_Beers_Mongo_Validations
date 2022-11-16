const express = require('express')
const router = express.Router()

const {getBeers, getBeer, addBeer, deleteBeer, editBeer} = require('../controllers/cervezas')

const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')
const { isBeerNameUnique } = require('../helpers/db-validators')

router.get('/', getBeers)
router.get('/:id', getBeer)
router.post('/', [
    check('Nombre', 'Nombre is mandatory').not().isEmpty(),
    check('Nombre').custom(isBeerNameUnique),
    check('Nombre', 'Nombre must have between 2 and 30 characters').isLength({ min: 2, max: 30 }),
    check('Descripcion', 'Descripcion is mandatory').not().isEmpty(),
    check('Descripcion', 'Descripcion must have between 5 and 240 characters').isLength({min: 5, max: 240 }),
    check('Graduacion', 'Graduacion is mandatory').not().isEmpty(),
    check('Graduacion', 'Graduacion must be a float number').isDecimal(),
    check('Envase', 'Envase is mandatory').not().isEmpty(),
    check('Envase', 'Envase must have between 4 and 60 characters').isLength({ min: 4, max: 60 }),
    check('Precio', 'Precio is mandatory').not().isEmpty(),
    check('Precio', 'Precio must be a float number').isDecimal(),
    validateFields
], addBeer)
router.delete('/:id', deleteBeer)
router.put('/:id', [
    check('Descripcion', 'Descripcion is mandatory').not().isEmpty(),
    check('Descripcion', 'Descripcion must have between 5 and 240 characters').isLength({min: 5, max: 240 }),
    check('Graduacion', 'Graduacion is mandatory').not().isEmpty(),
    check('Graduacion', 'Graduacion must be a float number').isDecimal(),
    check('Envase', 'Envase is mandatory').not().isEmpty(),
    check('Envase', 'Envase must have between 4 and 60 characters').isLength({ min: 4, max: 60 }),
    check('Precio', 'Precio is mandatory').not().isEmpty(),
    check('Precio', 'Precio must be a float number').isDecimal(),
    validateFields
], editBeer)

module.exports = router