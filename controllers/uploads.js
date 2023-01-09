const path = require('path');
const fs   = require('fs');


const { response } = require('express');
const { uploadFile } = require('../helpers/uploadFile');

const { User } = require('../models/usuario');
const { Bar } = require('../models/bar');
const { Beer } = require('../models/cerveza');
const { Wine } = require('../models/vino');

const upload = async(req, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    try {
        
        // txt, md
        // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
        const nombre = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

const updateImage = async(req, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were updated.');
        return;
    }

    try {
        const id = req.params.id;
        const colection = req.params.colection;
        const img = await uploadFile( req.files, undefined, 'imgs' );
        switch (colection) {
            case 'usuarios':
                
                console.log('entra')
                const user = await User.findByIdAndUpdate(id, { "img": img } );
                console.log('sale')
                break;
            case 'cervezas':
                await Beer.findByIdAndUpdate(id, { "img": img } );
                break;
            case 'vinos':
                await Wine.findByIdAndUpdate(id, { "img": img } );
                break;
            case 'bares':
                await Bar.findByIdAndUpdate(id, { "img": img } );
                break;
            default:
                break;
        }
        // res.json({ 'msg': modificado });
    } catch (msg) {
        res.status(400).json({ msg });
    }

}


module.exports = {
    upload, updateImage
}



