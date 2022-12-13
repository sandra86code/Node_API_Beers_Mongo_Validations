const { response, request } = require('express');
const Vino = require('../models/vino');


async function getWines(req = request, res = response){
    const {name, type, graduation, price, limit=5, skip=0 } = req.query;
    const query = {name, type, graduation, price, limit, skip};
    for(const key in query) {
        if(query[key] === undefined) {
            delete query[key];
        }
    }
    const wines = await Vino.find(query)
    if(wines.length) {
        res.json(wines);
    }else {
        res.status(404).json({ message: 'La búsqueda no ha arrojado ningún resultado'})
    }
}


async function getWine(req = request, res = response) {
    const wineId = req.params.id
    const wine = await Vino.findOne({ _id: wineId });
    if (wine) {
        res.json(wine);
    } else {
        res.status(404).json({ message: `El vino con id ${wineId} no existe` })
    }
}


async function addWine(req = request, res = response) {
    const { name, type, graduation, price } = req.body;
    const wine = new Vino({ name, type, graduation, price });
    await wine.save();
    console.log('Vino añadida')
    res.json({
        wine
    });
}


async function deleteWine(req = request, res = response) {
    const wineId = req.params.id;
    const wine = await Vino.findByIdAndDelete(wineId);
    console.log("Borrado vino con id: ", wineId);
    res.json(wine);
}


async function editWine(req = request, res = response) {
    const wineId = req.params.id;
    const { name, type, graduation, price } = req.body;
    const updatedWine = await Vino.findByIdAndUpdate(wineId, { name, type, graduation, price } );
    console.log("Editando vino con id: ", wineId);
    res.json( await Vino.findById(wineId) );
}


module.exports = { getWines, getWine, addWine, deleteWine, editWine }