
const { Router } = require('express');
const { upload, updateImage } = require('../controllers/uploads')
const { check } = require('express-validator')
const router = Router();
const allowedCollections = ['usuarios', 'cervezas', 'vinos', 'bares']


router.post( '/', upload );
router.put('/:colection/:id', [
    check('id', 'No es un id correcto').isMongoId(),
    check('colection', 'No es una coleccion valida').isIn(allowedCollections)
    ], 
    updateImage)




module.exports = router;