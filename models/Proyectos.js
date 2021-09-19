const  { Sequelize , DataTypes} = require('sequelize')
const db = require('../config/db')
const slug = require('slug')
const shortid = require('shortid')

const Proyectos = db.define('proyectos', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    url: {
        type: DataTypes.STRING
    }

},{
    hooks: {
        
        beforeCreate( proyecto ){
            const url = slug( proyecto.nombre ).toLowerCase()


            proyecto.url = `${ url }-${ shortid.generate() }`
        }
    }
})

module.exports = Proyectos
