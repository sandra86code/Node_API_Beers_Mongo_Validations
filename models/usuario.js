const { Schema, model} = require('mongoose');

const UserSchema = Schema({
    Nick: {
        type: String,
        required: [true, 'El nick es obligatorio'],
        unique: true
    },
    Password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],
    },
    Email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    Nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    Apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios'],
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user
}

module.exports = model( 'Usuario', UserSchema )
