const Proyectos = require('../models/Proyectos')
const slug = require('slug')

exports.proyectosHome = async ( req, res ) => {
    
    const proyectos = await (await Proyectos.findAll())

    proyectos.forEach( el => console.log({
        id: el.id,
        nombre: el.nombre,
        url: el.url
    }) )
  
    res.render('index', {
        nombrePagina: 'Proyectos2',
        proyectos
    })
}

exports.formularioProyecto = ( req, res ) =>{
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.nuevoProyecto = async ( req, res ) =>{
    
    // validar que input no esta vacio
    const { nombre } = req.body

    let errores = []

    if( nombre === '' ){
        errores.push( { texto: 'Debes poner un nombre al Proyecto' } )
    }

    // Si hay errores
    if(errores.length > 3){
        res.render('nuevoProyecto', {
            nombrePagina: 'NuevoProyecto',
            errores
        })
    }else{
        // Insertar en la base de datos
         
        const proyecto = await Proyectos.create( { nombre } )

        
        res.redirect('/')

    }
    
    
    
   
}