const { response, request } = require('express');
const Cerveza = require('../models/cerveza');


//Método que muestra todas las cervezas
async function getBeers(req = request, res = response){
    const {Nombre, Descripcion, Graduacion, Envase, Precio='1€' } = req.query;
    const query = {Nombre, Descripcion, Graduacion, Envase, Precio};
    for(const key in query) {
        if(query[key] === undefined) {
            delete query[key];
        }
    }
    const beers = await Cerveza.find(query)
    if(beers.length) {
        res.json(beers);
    }else {
        res.json({ message: 'La búsqueda no ha arrojado ningún resultado'})
    }
}


//Método que muestra una cerveza a partir de su id
async function getBeer(req = request, res = response) {
    const beerId = req.params.id
    const beer = await Cerveza.findOne({ _id: beerId });
    if (beer) {
        res.json(beer);
    } else {
        res.json({ message: `La cerveza con id ${beerId} no existe` })
    }
}


//Método que añade una nueva cerveza
async function addBeer(req = request, res = response) {
    const { Nombre, Descripcion, Graduacion, Envase, Precio } = req.body;
    const beer = new Cerveza({ Nombre, Descripcion, Graduacion, Envase, Precio });
    // Guardar en BD
    await beer.save();
    console.log('Cerveza añadida')
    res.json({
        beer
    });
}


//Método que elimina una cerveza a partir de su id
async function deleteBeer(req = request, res = response) {
    const beerId = req.params.id;
    const beer = await Cerveza.findByIdAndDelete(beerId);
    console.log("Borrada cerveza con id: ", beerId);
    res.json(beer);
}


//Metodo para editar una cerveza a partir de su id
async function editBeer(req = request, res = response) {
    const beerId = req.params.id;
    const { Descripcion, Graduacion, Envase, Precio } = req.body;
    const updatedBeer = await Cerveza.findByIdAndUpdate(beerId);
    console.log("Editando cerveza con id: ", beerId);
    res.json( await Cerveza.findById(beerId) );
}


module.exports = { getBeers, getBeer, addBeer, deleteBeer, editBeer }