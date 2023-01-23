const path = require('path');
const fs   = require('fs');


const { response } = require('express');
const { uploadFile } = require('../helpers/uploadFile');

const User  = require('../models/usuario');
const Bar  = require('../models/bar');
const Beer = require('../models/cerveza');
const Wine = require('../models/vino');

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

const updateImage = async(req = request, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were updated.');
        return;
    }

    try {
        const id = req.params.id;
        const colection = req.params.colection;
        
        let result = null;
        switch (colection) {
            case 'usuarios':
                result = await User.findById(id);
                break;
            case 'cervezas':
                result = await Beer.findById(id);
                break;
            case 'vinos':
                result =  await Wine.findById(id);
                break;
            case 'bares':
                result = await Bar.findById(id);
                break;
        }
        if(result.img) {
            let imgPath = path.join( __dirname, '../uploads/', colection, result.img);
            if(fs.existsSync( imgPath )) {
                fs.unlinkSync(imgPath);
            };
        }
        const img = await uploadFile( req.files, undefined, colection );
        result.img = img;
        await result.save();
        return res.json( img );
    } catch (msg) {
        return res.status(400).json({ msg });
    }

}


const getImage = async(req, res = response) => {

    try {
        const id = req.params.id;
        const colection = req.params.colection;
        let result = null;
        switch (colection) {
            case 'usuarios':
                result = await User.findById(id);
                break;
            case 'cervezas':
                result = await Beer.findById(id);
                break;
            case 'vinos':
                result =  await Wine.findById(id);
                break;
            case 'bares':
                result = await Bar.findById(id);
                break;
            default:
                break;
        }
        if(result.img) {
            let imgPath = path.join( __dirname, '../uploads/', colection, result.img);
            return res.sendFile( imgPath );
        }
        return res.status(200).sendFile(path.join( __dirname, '..//assets/notfound.png'));
    } catch (msg) {
        return res.status(400).json({ msg });
    }

}

module.exports = {
    upload, updateImage, getImage
}



