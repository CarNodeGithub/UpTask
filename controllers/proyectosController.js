const Proyectos = require('../models/Proyectos')
const slug = require('slug')


const todosProyectos = async () => {
    const proyectos = await Proyectos.findAll()
    
    return proyectos

}

exports.proyectosHome = async ( req, res ) => {
    
    const proyectos = await Proyectos.findAll()
   

    proyectos.forEach( el => console.log({
        id: el.id,
        nombre: el.nombre,
        url: el.url
    }) )
  
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    })
}

exports.formularioProyecto = async ( req, res ) =>{
    const proyectos = await Proyectos.findAll()
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async ( req, res ) =>{
    
    const proyectos = await Proyectos.findAll()
    
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
            errores,
            proyectos
            
        })
    }else{
        // Insertar en la base de datos
         
        const proyecto = await Proyectos.create( { nombre } )

        
        res.redirect('/')

    }
    
    
    
   
}
exports.proyectoPorUrl = async( req, res, next) =>{
    const proyectosPromise = Proyectos.findAll()
    const proyectoPromise = Proyectos.findOne({
        where:{
            url: req.params.url
        }
    })
    const [ proyectos, proyecto ] = await Promise.all( [ proyectosPromise, proyectoPromise] )

    
    if(!proyecto){
        console.log('vacio')
        return next()
        
    }
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
    
    
} 

exports.formularioEditar = async (req, res)=>{
    
    const proyectosPromise = Proyectos.findAll()
    const proyectoPromise = Proyectos.findOne({
        where:{
            id: req.params.id
        }
    })
    const [ proyectos, proyecto ] = await Promise.all( [ proyectosPromise, proyectoPromise] )



    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}
exports.actualizarProyecto = async ( req, res )=>{
    const proyectos = await Proyectos.findAll()
    
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
            errores,
            proyectos
            
        })
    }else{
        // Insertar en la base de datos
         
        await Proyectos.update(
             { nombre: nombre },
             {
                 where: {id: req.params.id}
             }
            
        )

        
        res.redirect('/')

    }
    
    
    
   
}
