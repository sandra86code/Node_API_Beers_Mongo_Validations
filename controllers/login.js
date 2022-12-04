const { response, request } = require('express');
const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { genJWT } = require('../helpers/genJWT')

//Método que muestra un usuario a partir de su id
async function getLogin(req = request, res = response){
    const { Email, Password } = req.body;
    try {
        const user = await User.findOne({ Email });
        if(!user) { //Verificar si el email existe
            return res.status(401).json({ message: `Incorrect user/password - email` });
        }else if(!user.state) {
            return res.status(401).json({ message: `Incorrect user/password - inactive` });
        }else if(!bcryptjs.compareSync(Password, user.Password)) {
            return res.status(401).json({ message: `Incorrect user/password - password` });
        }else {
            const token = await genJWT(user._id);
            return res.json({ user, token })
        }
    } catch(error) {//Errores del servidor
        console.log(error)
        res.status(500).json({ message: `Error del servidor.` })
    }
}

module.exports = { getLogin }
