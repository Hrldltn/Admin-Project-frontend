import {useEffect,useState} from 'react'
import { formatearFecha } from '../helpers/formatearFecha'
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin'

const Tarea = ({tarea}) => {

  const admin = useAdmin()
  const {handleModalEditarTarea,handleModalEliminarTarea,completarTarea} = useProyectos()

  const {descripcion,nombre,prioridad,fechaEntrega,_id,estado} = tarea
  const [baja,setBaja]=useState(false)

  const [alta,setAlta]=useState(false)

  useEffect(() => {
    const verEstado = () =>{
    
      if(prioridad == 'Baja'){
        setBaja(true)
      }

      if(prioridad== 'Alta'){
        setAlta(true)
      }
    }
  
    verEstado()
  }, [])
  

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between  items-center">
      <div className="flex  flex-col items-start">
        <p className="text-xl font-bold mb-1 text-black">{nombre}</p>
        <p className="text-sm font-bold mb-1  text-black uppercase"><span className="text-sm text-gray-600 uppercase">Descripción:</span> {descripcion}</p>
        <p className="text-sm text-gray-600 font-bold uppercase">Prioridad:  <span className={`${baja ? 'bg-sky-300' : 'bg-yellow-300'} 
                                                                                     ${alta ? 'bg-red-300' : 'bg-sky-300'} 
                                                                                    text-sm font-bold mb-1 text-black uppercase rounded-md px-1`} >{prioridad}</span></p>
        <p className="text-sm font-bold mb-1 text-black uppercase"><span className="text-sm text-gray-600 uppercase">Fecha de entrega:</span> {formatearFecha(fechaEntrega)}</p>
        {estado && <p className="text-sm font-bold mb-1 px-2 pr-5 text-white uppercase bg-green-500 rounded "><span className="text-sm text-white uppercase">Completada por:</span> {tarea.completado.nombre} {' '} {tarea.completado.apellido}</p>}
      </div>
      <div className="flex gap-2 flex-col md:flex-row mt-5 md:mt-0 ">       
        <button onClick={() => completarTarea(_id)} className={`${estado ? 'bg-sky-600 hover:bg-sky-800' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          >{estado ? 'Completa' : 'Incompleta'}</button>
        {admin && (
          <>
              <button onClick={() => handleModalEditarTarea(tarea)} className="bg-indigo-600 hover:bg-indigo-800 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
              >Editar</button>
              
              <button onClick={() => handleModalEliminarTarea(tarea)} className="bg-red-600  hover:bg-red-800 px-4 py-3  text-white uppercase font-bold text-sm rounded-lg"
              >Eliminar</button>
          
          </>
        )}  
       </div>   
   
    </div>
  )
}

export default Tarea
