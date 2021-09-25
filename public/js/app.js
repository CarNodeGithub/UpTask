import tareas from './modulos/proyectos'
import Swal from 'sweetalert2'
import axios from 'axios'

const btnEliminar = document.querySelector('#eliminar-proyecto')

if (btnEliminar) {
    btnEliminar.addEventListener('click', ()=>{
   

    Swal.fire({
        title: 'Estas seguro?',
        text: "Esto es irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire(
            'Borrado!',
            'El proyecto ha sido eliminado.',
            'success'
        )
        // redireccionar al inicio
        setTimeout(() => {
            window.location.href = '/'
            }, 3000);
        }
        

    })
     
})

}

export default btnEliminar
