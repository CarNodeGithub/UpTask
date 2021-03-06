const router = require('express').Router()
const proyectosController = require('../controllers/proyectosController')
const { body } = require('express-validator/check')

module.exports = () => {

    router.get('/', proyectosController.proyectosHome)
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto)
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto)

    // Listar Proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl)

    //Actualizar proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar)
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto)


    return router
}
