/*
// Variables de entorno
require('dotenv').config()
const PORT = process.env.SERVER_PORT

const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const proyectosRoutes = require('./routes/proyectosRouter')




// Crear conexion a la db e importar modelo
require('./models/Proyectos')
const db = require('./config/db')
db.sync()
    .then( () => console.log('Conectado al Servidor de DB'))
    .catch( error => console.log(error) )

// Habilitar pug
app.set('view engine', 'pug')

// Carpeta archivos estaticos
app.use( express.static( 'public' ) )


// Carpeta para las vista
app.set('views', path.join(__dirname, './views'))

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Ruta para el home

app.use('/', proyectosRoutes())






// Servidor
app.listen(PORT, ()=>{
    console.log( `Servidor corriendo en 127.0.0.1:${PORT}` );
})
*/
require('./config/server')

