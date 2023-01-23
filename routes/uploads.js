
const { Router } = require('express');
const { upload, updateImage, getImage } = require('../controllers/uploads')
const { check } = require('express-validator')
const router = Router();
const allowedCollections = ['usuarios', 'cervezas', 'vinos', 'bares']


router.post( '/', upload );
router.put('/:colection/:id', [
    check('id', 'No es un id correcto').isMongoId(),
    check('colection', 'No es una coleccion valida').isIn(allowedCollections)
    ], 
    updateImage);
router.get('/:colection/:id', [
    check('id', 'No es un id correcto').isMongoId(),
    check('colection', 'No es una coleccion valida').isIn(allowedCollections)
    ],
    getImage );



module.exports = router;