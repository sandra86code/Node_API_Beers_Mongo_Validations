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
    const id = req.params.id
    const beer = await Cerveza.find({ _id: id });
    if (beer.length) {
        res.json(beer);
    } else {
        res.json({ message: `La cerveza ${id} no existe` })
    }
}


//Método que añade una nueva cerveza
async function addBeer(req = request, res = response) {
    const { Nombre, Descripcion, Graduacion, Envase, Precio } = req.body;
    const beer = new Cerveza({ Nombre, Descripcion, Graduacion, Envase, Precio });

    // Guardar en BD
    await beer.save();
    console.log('Cerveza añadida')
    console.log(parseFloat(beer.Graduacion));
    res.json({
        beer
    });
}


//Método que elimina una cerveza a partir de su id
async function deleteBeer(req = request, res = response) {
    const beerId = req.params.id;
    const beer = await Cerveza.find({ _id: beerId });
    if (beer.length) {
        await Cerveza.deleteOne({ _id: beerId });
        console.log("Borrada cerveza con id: ", beerId);
        res.json(beer);
    } else {
        res.json({ message: `La cerveza con id ${beerId} no existe` })
    }
}


//Metodo para editar una cerveza a partir de su id
async function editBeer(req = request, res = response) {
    const beerId = req.params.id;
    const { Descripcion, Graduacion, Envase, Precio } = req.body;
    const updatedBeer = await Cerveza.find({ _id: beerId });

    if (updatedBeer.length) {
        //Actualizar cerveza en BD
        await Cerveza.updateOne({ _id: beerId }, { Descripcion, Graduacion, Envase, Precio });
        console.log("Editando cerveza con id: ", beerId);
        res.json( await Cerveza.find({ _id: beerId }));
    } else {
    res.json({ message: `La cerveza con id ${beerId} no existe` })
    }
}


module.exports = { getBeers, getBeer, addBeer, deleteBeer, editBeer }