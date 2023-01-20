import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Spinner from './Spinner'
import useProyectos from '../hooks/useProyectos'
import { formatearFecha } from '../helpers/formatearFecha'
import useAuth from '../hooks/useAuth'

const PreviewProyecto = ({proyecto}) => {
    const {auth} = useAuth()
    const {cargando} = useProyectos()
    const {nombre ,_id, cliente,fechaEntrega,descripcion,creador} = proyecto


  return (
    cargando ? 
    <Spinner></Spinner>
    :(
    <>
        <div className="border-b  border-gray-600 p-5 flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col gap-3">
                <div className="flex-1 text-md">
                    <p >
                      <span className="font-bold text-xl">{nombre}</span>
                    </p>
                    <p className="text-md mt-2 text-gray-600 font-bold uppercase">{' '} Cliente: {' '}
                    <span className="font-bold text-black">{cliente}</span></p>
                   
                </div>
              <p className="font-bold">
                <span className="text-md text-gray-600 font-bold uppercase">Entrega:</span>{' '}{formatearFecha(fechaEntrega)}
              </p>
              <p className="font-bold">
                <span className="text-md text-gray-600 font-bold uppercase">Descripción:</span>{' '}{descripcion}
              </p>

            </div>
            <div className="flex flex-col items-center">
                {auth._id !== creador && (
                  <p className="p-1 px-3 mt-4 md:mt-0 text-md rounded-lg text-white bg-green-500 font-bold mb-5">{' '}Colaborador</p>
                )}
                <Link
                
                    to={`${_id}`}
                    className="mt-3 md:mt-0 text-gray-600 flex items-center justify-center gap-2 hover:text-black uppercase text-sm font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-sky-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    Ver Proyecto
                </Link>
            </div>  
        </div>
       
    </>
    )
  )
}

export default PreviewProyecto