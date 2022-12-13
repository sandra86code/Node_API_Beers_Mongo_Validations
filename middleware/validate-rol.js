const { request, response } = require('express');

const isAdminRol = (req=request, res=response, next) => {
    if(!req.user) {
        return res.status(500).json({ msg: 'No se ha validado el token primero'});
    }

    const {rol, Nombre } = req.user;
    if(rol!=='ADMIN_ROLE') {
        return res.status(401).json({ msg: `${Nombre} no es administrador`});
    }

    next()
}

const hasRol = ( ...roles) => {
    return(req=request, res=response, next) => {
        //Aquí iría el código para validar los roles
        if(!req.user) {
            return res.status(500).json({ msg: 'No se ha validado el token primero'});
        }
        const {rol, Nombre } = req.user;
        if(!roles.includes(rol)) {
            return res.status(401).json({ msg: `${Nombre} no tiene rol válido`});
        }
        
        next()
    }
}

module.exports = { isAdminRol, hasRol }