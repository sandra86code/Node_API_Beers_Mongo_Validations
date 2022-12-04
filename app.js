const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const app = express()


const cervezas = require('./routes/cervezas')
const usuarios = require('./routes/usuarios')
const bares = require('./routes/bares')
const auth = require('./routes/auth')

// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()

//MIDDLEWARE
app.use(express.json())

//ROUTES
app.use('/cervezas', cervezas)
app.use('/bares', bares)
app.use('/usuarios', usuarios)
app.use('/auth', auth)


app.listen(process.env.PORT)