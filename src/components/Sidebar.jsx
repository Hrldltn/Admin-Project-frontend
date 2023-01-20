import React from 'react'
import {useParams} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin'

const Sidebar = () => {

  const {admin}=useAdmin()
  const {auth} = useAuth()
  const {handleFormularioProyecto} = useProyectos()
  const Params = useParams()

  return (
    <aside className='md:w-1/3 mt-40 lg:mt-0 md:mt-5 lg:w-1/5 xl:w-1/6 px-5 py-10 bg-gray-200'>
      <p className="text-xl font-bold">Bienvenido: {auth.nombre}{' '}{auth.apellido}</p>
      <button className=" bg-sky-600 hover:bg-sky-800 w-full p-2 text-white font-bold uppercase block mt-5 text-center rounded-lg" onClick={ handleFormularioProyecto }
          >{Params.id ? 'Editar Proyecto' : 'Nuevo Proyecto'}
      </button>           

    </aside>
  )
}

export default Sidebar