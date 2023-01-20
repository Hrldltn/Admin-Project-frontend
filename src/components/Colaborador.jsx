import React from 'react'
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin'

const Colaborador = ({colaborador}) => {
  const {admin} = useAdmin()

  const {handleModalEliminarColaborador} = useProyectos()

  const {nombre , email, apellido} = colaborador
  
  return (
    <div className="border-b p-5  justify-between md:flex-row flex flex-col gap-3 ">
      <div>
        <p className="font-bold text-black">{nombre}</p>
        <p className="font-bold text-black">{apellido}</p>
        <p className="text-sm text-gray-700 font-bold">{email}</p>
      </div>
    
        <div className="">
          <button
              type="button"
              className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
              onClick={() => handleModalEliminarColaborador(colaborador)}
          >Eliminar</button>

        </div>
    </div>
 
  )
}

export default Colaborador
