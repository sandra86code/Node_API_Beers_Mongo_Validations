const { response, request } = require('express');
const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')

//Método que muestra los usuarios filtrados
async function getUsers(req = request, res = response){
    const { Nick, Password, Email, Nombre, Apellidos, limit=5, skip=0} = req.query;
    const query = { Nick, Password, Email, Nombre, Apellidos, limit, skip };
    for(const key in query) {
        if(query[key] === undefined) {
            delete query[key];
        }
    }
    const users = await User.find(query).limit(limit).skip(skip);
    if(users.length) {
        res.json(users);
    }else {
        res.status(404).json({ message: 'La búsqueda no ha arrojado ningún resultado'})
    }
}

//Método que muestra un usuario a partir de su id
async function getUser(req = request, res = response){
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    if(user) {
        res.json(user);
    }else {
        res.status(404).json({ message: `El usuario con id ${userId} no existe` });
    }
}

//Método que añade un nuevo usuario
async function addUser(req = request, res = response){
    const { Nick, Password, Email, Nombre, Apellidos, rol} = req.body;
    const user = new User({Nick, Password, Email, Nombre, Apellidos, rol})
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.Password = bcryptjs.hashSync( Password, salt );

    //Guardar en BD
    await user.save();    
    console.log('Añadido nuevo usuario: ', user);
    res.json({
        user
    });
}

// //Método que elimina un usuario a partir de su id
// async function deleteUser(req = request, res = response){
//     const userId = req.params.id;
//     const user = await User.findByIdAndDelete({ _id: userId });
//     console.log("Borrado usuario con id: ", userId);
//     res.json(user);
// }

//Método que modifica un parámetro de true a false para hacer ver que el usuario está inactivo
async function deleteUser(req = request, res = response){
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, { "state": false });
    console.log("Desactivado usuario con id: ", userId);
    res.json(user);
}

//Método que actualiza un usuario a partir de su id
async function editUser(req = request, res = response){
    const userId = req.params.id;
    const { Password, Nombre, Apellidos, rol} = req.body;
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    let encryptedPassword = bcryptjs.hashSync( Password, salt );

    //Actualizar usuario en la BD
    const updatedUser = await User.findByIdAndUpdate(userId, { encryptedPassword, Nombre, Apellidos, rol } );
    console.log("Editando usuario con id: ", userId);
    res.json(await User.findById(userId));
}



module.exports = { getUsers, getUser, addUser, deleteUser, editUser }