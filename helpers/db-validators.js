const Rol = require('../models/rol')
const Usuario  = require('../models/usuario')
const Cerveza  = require('../models/cerveza')
const Bar  = require('../models/bar')
const Vino  = require('../models/vino')


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

const existsUser = async (id)=> {
	const user = await Usuario.findById(id);
		if (!user) {
			throw new Error(`UserId ${id} doesn't exist in database`)
		}
}

const existsBeer = async (id)=> {
	const beer = await Cerveza.findById(id);
		if (!beer) {
			throw new Error(`BeerId ${id} doesn't exist in database`)
		}
}

const existsBar = async (id)=> {
	const bar = await Bar.findById(id);
		if (!bar) {
			throw new Error(`BarId ${id} doesn't exist in database`)
		}
}


const isWineNameUnique = async (name) => {
	const existsWineName = await Vino.findOne({ name });
		if (existsWineName) {
			throw new Error(`Wine called ${name} already exists in database`)
		}
}

const existsWine = async (id)=> {
	const wine = await Vino.findById(id);
		if (!wine) {
			throw new Error(`Wine with id ${id} doesn't exist in database`)
		}
}

module.exports = { existsWine, isWineNameUnique, isValidRol, isEmailUnique, isNickUnique, isBeerNameUnique, isBarNameUnique, isBarAddressUnique, isBarPhoneUnique, existsUser, existsBar, existsBeer }