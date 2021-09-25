
// Variables de entorno
require('dotenv').config()


const express = require('express')
//const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const proyectosRoutes = require('../routes/proyectosRouter')

// helpers
const helpers = require('./helpers')
//console.log(proyectosRoutes);

class Server {

  constructor() {
    this.app = express();
    this.conexion()
    this.config()
    this.middlewares();
    this.routes();
    this.port = process.env.SERVER_PORT || 3000

  }

  conexion(){
    // Crear conexion a la db e importar modelo
    require('../models/Proyectos')
    const db = require('../config/db')
    db.sync()
      .then( () => console.log('Conectado al Servidor de DB'))
      .catch( error => console.log(error) )
  }
  middlewares() {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    //Pasar vardump a la app
    this.app.use( ( req, res, next )=>{
      //Crear variables
      const fecha = new Date()
      res.locals.year = fecha.getFullYear()
      res.locals.vardump = helpers.vardump
      next()
    })
  }

  routes() {
    this.app.use('/', proyectosRoutes())
  }

  config(){
    // Habilitar pug
    this.app.set('view engine', 'pug')

    // Carpeta archivos estaticos
    this.app.use( express.static( 'public' ) )

    // Carpeta para las vista
    this.app.set('views', path.join(__dirname, '../views'))
  }

  iniciar() {
    this.app.listen(this.port, () => {
        console.log(`Servidor corriendo en 127.0.0.1:${this.port}`);
    })
  }
}

module.exports =  new Server().iniciar();
