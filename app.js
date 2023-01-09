const express = require('express');
const { dbConnection } = require('./database/config');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express()

const vinos = require('./routes/vinos')
const cervezas = require('./routes/cervezas')
const usuarios = require('./routes/usuarios')
const bares = require('./routes/bares')
const auth = require('./routes/auth')
const uploads = require ('./routes/uploads');


// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()

//MIDDLEWARE
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}));

//ROUTES
app.use('/vinos', vinos)
app.use('/cervezas', cervezas)
app.use('/bares', bares)
app.use('/usuarios', usuarios)
app.use('/auth', auth)
app.use('/upload', uploads)


app.listen(process.env.PORT)