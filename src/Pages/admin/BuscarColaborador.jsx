import { useEffect } from "react"
import FormularioBuscarColaborador from "../../components/FormularioBuscarColaborador"
import useProyectos from "../../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Spinner from '../../components/Spinner'
import {toast} from 'react-toastify'

const BuscarColaborador = () => {

  const params = useParams()
  const {obtenerProyecto,proyecto,cargando,colaborador,agregarColaborador} = useProyectos()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  
  
  
  return (
    cargando ? 
    <Spinner></Spinner>
    :(
      <>
        <h1 className="text-4xl font-black">Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>

        <div className="mt-10 flex justify-center">
              <FormularioBuscarColaborador/>
        </div>

        {colaborador?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"> 
                <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
                <div className="flex justify-between flex-col  items-center">
                  <p className="font-bold text-black text-lg">{colaborador.nombre}{' '}{colaborador.apellido}</p>
                  <p className="font-bold text-black text-lg">{colaborador.email}</p>
                  <button onClick={() => agregarColaborador ({
                    email:colaborador.email
                  })} type="button" className="bg-slate-500  py-2 px-10 rounded text-white text-sm md:text-lg uppercase font-bold mt-5 hover:cursor-pointer mb-5 hover:bg-slate-600  mx-5">
                    Agregar al Proyecto
                  </button>
                </div>
            </div>
          </div>

        )}
      </>
    ) 
  )
}

export default BuscarColaborador
