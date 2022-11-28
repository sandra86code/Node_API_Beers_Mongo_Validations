const { response, request } = require('express');
const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')


//Método que muestra un usuario a partir de su id
async function getLogin(req = request, res = response){
    const { Email, Password } = req.body;
    
    const user = await User.findOne({ Email });
    if(!user) {
        return res.status(401).json({ message: `No existe el email.` });
    }else if(!bcryptjs.compareSync(Password, user.Password)) {
        return res.status(401).json({ message: `No coinciden las contraseñas.` });
    }else if(!user.state) {
        return res.status(401).json({ message: `El usuario está inactivo.` });
    }else {
        return res.json({ user })
    }
}

module.exports = { getLogin }