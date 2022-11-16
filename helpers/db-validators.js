const Rol = require('../models/rol')
const Usuario  = require('../models/usuario')
const Cerveza  = require('../models/cerveza')
const Bar  = require('../models/bar')



const isValidRol = async (rol = '')=> {
	const existeRol = await Rol.findOne({ rol })
		if (!existeRol) {
			throw new Error(`Rol ${rol} doesn't exist in database`)
		}
}
 

const isEmailUnique = async (Email) => {
	const existsEmail = await Usuario.findOne({ Email});
		if (existsEmail) {
			throw new Error(`Email ${Email} already exists in database`)
		}
}


const isNickUnique = async (Nick) => {
	const existsNick = await Usuario.findOne({ Nick });
		if (existsNick) {
			throw new Error(`Nick ${Nick} already exists in database`)
		}
}


const isBeerNameUnique = async (Nombre) => {
	const existsNombre = await Cerveza.findOne({ Nombre });
		if (existsNombre) {
			throw new Error(`Nombre ${Nombre} already exists in database`)
		}
}


const isBarNameUnique = async (Nombre)=> {
	const existsBarName = await Bar.findOne({ Nombre })
		if (existsBarName) {
			throw new Error(`Nombre ${Nombre} already exists in database`)
		}
}


const isBarAddressUnique = async (Direccion)=> {
	const existsBarAddress = await Bar.findOne({ Direccion })
		if (existsBarAddress) {
			throw new Error(`Direccion ${Direccion} already exists in database`)
		}
}


const isBarPhoneUnique = async (Telefono)=> {
	const existsBarPhone = await Bar.findOne({ Telefono })
		if (existsBarPhone) {
			throw new Error(`Telefono ${Telefono} already exists in database`)
		}
}

module.exports = { isValidRol, isEmailUnique, isNickUnique, isBeerNameUnique, isBarNameUnique, isBarAddressUnique, isBarPhoneUnique }