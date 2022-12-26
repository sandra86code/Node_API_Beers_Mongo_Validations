const { response, request } = require('express');
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadFile = (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: 'No files were uploaded.'});
    }
    const { file } = req.files;
    const extension = file.name.split(".").pop();
    const allowedExtensions = ['png', 'jpg', 'bmp', 'jpeg'];

    if(!allowedExtensions.includes(extension)) {
      return res.status(400).json({msg: 'Extension not allowed'})
    }

    const uploadPath = path.join(__dirname, '../uploads' , `${uuidv4()}.${extension}`);
    
    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).json( {msg: err});
      }
      res.json({msg: `File uploaded to ${uploadPath}`});
    });
};
    
module.exports = { uploadFile }



