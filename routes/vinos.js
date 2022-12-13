const express = require('express')
const router = express.Router()

const {getWines, getWine, addWine, deleteWine, editWine} = require('../controllers/vinos')

const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')
const { isWineNameUnique, existsWine } = require('../helpers/db-validators')
const { validateJWT } = require('../middleware/validate-jwt');
const { isAdminRol, hasRol } = require('../middleware/validate-rol');

router.get('/', [
    validateJWT,
], getWines) 
router.get('/:id', [
    validateJWT,
    check('id', 'Not correct id').isMongoId(),
    validateFields,
], getWine)
router.post('/', [
    validateJWT,
    hasRol('ADMIN_ROLE', 'SELL_ROLE'),
    check('name', 'name is mandatory').not().isEmpty(),
    check('name').custom(isWineNameUnique),
    check('type', 'type is mandatory').not().isEmpty(),
    check('graduation', 'graduation is mandatory').not().isEmpty(),
    check('graduation', 'graduacion must be a float number').isDecimal(),
    check('price', 'price is mandatory').not().isEmpty(),
    check('price', 'price must be a float number').isDecimal(),
    validateFields
], addWine)
router.delete('/:id', [
    validateJWT,
    hasRol('ADMIN_ROLE', 'DELETE_ROLE'),
    check('id', 'No es un id correcto').isMongoId(),
    check('id').custom(existsWine),
    validateFields,
], deleteWine)
router.put('/:id', [
    validateJWT,
    isAdminRol,
    check('id', 'No es un id correcto').isMongoId(),
    check('id').custom(existsWine),
    check('name', 'name is mandatory').not().isEmpty(),
    check('type', 'type is mandatory').not().isEmpty(),
    check('graduation', 'graduation is mandatory').not().isEmpty(),
    check('graduation', 'graduacion must be a float number').isDecimal(),
    check('price', 'price is mandatory').not().isEmpty(),
    check('price', 'price must be a float number').isDecimal(),
    validateFields
], editWine)

module.exports = router