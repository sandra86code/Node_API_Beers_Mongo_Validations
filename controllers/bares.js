const { response, request } = require('express');
const Bar = require('../models/bar');


//Método que muestra los bares filtrados
async function getBars(req = request, res = response){
    const {Nombre, Direccion, Ciudad="Stockholm", Telefono } = req.query;
    const query = {Nombre, Direccion, Ciudad, Telefono};
    for(const key in query) {
        if(query[key] === undefined) {
            delete query[key];
        }
    }
    const bars = await Bar.find(query);
    if(bars.length) {
        res.json(bars);
    }else {
        res.json({ message: 'La búsqueda no ha arrojado ningún resultado'})
    }
    
}


//Método que muestra un bar a partir de su id
async function getBar(req = request, res = response){
    const barId = req.params.id;
    const bar = await Bar.findOne({ _id: barId });
    if(bar) {
        res.json(bar);
    }else {
        res.json({ message: `La cerveza ${barId} no existe` });
    }
}


//Método que añade un nuevo bar
async function addBar(req = request, res = response){
    const { Nombre, Direccion, Ciudad, Telefono } = req.body;
    const bar = new Bar({Nombre, Direccion, Ciudad, Telefono});
    
    //Guardar en BD
    await bar.save();    
    console.log('Añadido nuevo bar: ', bar);
    res.json({
        bar
    });
}


//Método que elimina un bar a partir de su id
async function deleteBar(req = request, res = response){
    const barId = req.params.id;
    const bar = await Bar.findByIdAndDeleteById(id);
    console.log("Borrado bar con id: ", barId);
    res.json(bar);
}


//Método que actualiza un bar a partir de su id
async function editBar(req = request, res = response){
    const barId = req.params.id;
    const { Ciudad, Telefono } = req.body;
    const updatedBar = await Bar.findByIdAndUpdate(id, { Ciudad, Telefono });
    console.log("Editando bar con id: ", barId);
    res.json(await Bar.findById(barId));
}


module.exports = { getBars, getBar, addBar, deleteBar, editBar }