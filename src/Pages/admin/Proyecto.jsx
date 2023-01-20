import { useEffect } from 'react'
import {useParams , Link} from 'react-router-dom'
import useProyectos from '../../hooks/useProyectos'
import useAdmin from '../../hooks/useAdmin'
import Spinner from '../../components/Spinner'
import ModalFormularioProyecto from '../../components/ModalFormularioProyecto'
import ModalFormularioTarea from '../../components/ModalFormularioTarea'
import ModalEliminarTarea from '../../components/ModalEliminarTarea'
import ModalEliminarColaborador from '../../components/ModalEliminarColaborador'
import ModalEliminarProyecto from '../../components/ModalEliminarProyecto'
import ModalAgregarColaborador from '../../components/ModalAgregarColaborador'
import ModalBuscarColaborador from '../../components/ModalBuscarColaborador'
import Tarea from '../../components/Tarea'
import Colaborador from '../../components/Colaborador'
import io from 'socket.io-client'

let socket

const Proyecto = () => {
  const params = useParams()
  const {obtenerProyecto,proyecto,cargando,
         handleModalTarea,handleModalEliminarProyecto,
         handleFormularioProyecto,handleFormularioColaborador,
         submitTareasProyecto,eliminarTareaProyecto,
         actualizarTareaProyecto,cambiarEstadoTarea,
         handleBuscarColaborador} = useProyectos()

  const admin = useAdmin()
  

  useEffect (() =>{
    obtenerProyecto(params.id)
  },[])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto',params.id)
  }, [])

  useEffect(() => {
    socket.on('tarea agregada', (tareaNueva) =>{
      if(tareaNueva.proyecto === proyecto._id){
        submitTareasProyecto(tareaNueva)
      }
    })

    socket.on('tarea eliminada', tareaEliminada =>{
      if(tareaEliminada.proyecto === proyecto._id){
        eliminarTareaProyecto(tareaEliminada)
      }
    })
    socket.on('tarea actualizada', tareaActualizada =>{
      if(tareaActualizada.proyecto._id === proyecto._id){
        actualizarTareaProyecto(tareaActualizada)
      }
    })
    socket.on('nuevo estado', nuevoEstadoTarea =>{
      if(nuevoEstadoTarea.proyecto._id === proyecto._id){
        cambiarEstadoTarea(nuevoEstadoTarea)
      }
    })
  })
  
 
  
  const {nombre}=proyecto
 



  return (
    cargando ? 
    <Spinner></Spinner>
    :(
      <>
     
        <h1 className="font-black text-4xl mb-5 text-center md:text-left md:mb-0">{nombre}</h1>
          {admin && (
            <>
            <div className="flex justify-center md:justify-end gap-6">
              <div className="flex items-center gap-5  hover:cursor-pointer">
                <div className="flex items-center gap-3  hover:cursor-pointer">
                  <button className="font-bold uppercase text-lg hover:text-black text-gray-400" onClick={ () => handleFormularioProyecto (params.id) }
                    >Editar</button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>

                  <div className="flex items-center gap-3  hover:cursor-pointer">
                    <button className="font-bold uppercase text-lg hover:text-black text-gray-400" onClick={ () => handleModalEliminarProyecto (params.id) }
                    >Eliminar</button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-red-700 w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
              </div>
            </div>

              <button onClick={handleModalTarea} type="button" className="flex gap-2 items-center justify-center text-sm px-5 py-2 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 hover:bg-sky-600 text-white text-center mt-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nueva tarea
              </button>
            </>
          )}
          <div className="flex justify-between  items-center">
              <p className="font-bold text-lg md:text-2xl md:mt-10 mt-3 border-b border-black pb-3">Tareas del proyecto</p>

              <button onClick={handleModalTarea} type="button" className="flex gap-2 items-center justify-center font-bold uppercase text-sm md:text-xl hover:text-black text-gray-400">
                Adjuntar Documentos
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
          </div>
          <div className="bg-white  shadow mt-10 rounded-lg">
              {proyecto.tareas?.length ? 
                proyecto.tareas?.map(tarea =>(
                  <Tarea
                    key={tarea._id}
                    tarea={tarea}
                  >
                  </Tarea>
                ))
              : 
                <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>
              }
          </div>
          {admin && (
            <>
              <div className="flex items-center justify-between mt-10  flex-col md:flex-row">
                  <p className="font-bold text-2xl border-b border-black pb-3 w-96 ">Colaboradores</p>
                
              
                  <div className="flex items-center mt-3 gap-5">
                    <button className="font-bold uppercase text-lg hover:text-black text-gray-400" onClick={handleBuscarColaborador}
                    >Buscar</button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    <button className="font-bold uppercase text-lg hover:text-black text-gray-400" onClick={handleFormularioColaborador}
                    >Agregar</button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      
                 
                  </div>
            
              </div>
              <div className="bg-white shadow mt-10 rounded-lg">
                    {proyecto.colaboradores?.length ? 
                      proyecto.colaboradores?.map(colaborador =>(
                        <Colaborador
                          key={colaborador._id}
                          colaborador={colaborador}
                        >
                        </Colaborador>
                      ))
                    : 
                      <p className="text-center my-5 p-10">No hay colaboradores en este proyecto</p>
                      }
              </div>
            </>
           )}
          <ModalFormularioProyecto/>
          <ModalFormularioTarea/>
          <ModalEliminarProyecto/>
          <ModalEliminarTarea/>
          <ModalEliminarColaborador/>
          <ModalAgregarColaborador />
          <ModalBuscarColaborador />
      </>
      

    )
  )
}

export default Proyecto