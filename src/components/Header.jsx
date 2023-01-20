import React from 'react'
import {Link} from 'react-router-dom'
import imagen from '../assets/images'
import useProyectos from '../hooks/useProyectos'
import Busqueda from './Busqueda'
import useAuth from '../hooks/useAuth'
const Header = () => {
  const {handleBuscador ,cerrarSesion} = useProyectos()
  const {cerrarSesionAuth} = useAuth()

  const handleCerrarSesion = () =>{
    cerrarSesionAuth()
    cerrarSesion()
  }
  return (
    <header className="px-4 py-2 bg-gray-900 shadow-black fixed w-full">
      <div className="md:flex flex flex-col md:flex-row justify-center gap-5 items-center  md:justify-between">
        <div className="flex">
          <img className=" object-cover" style={{width: '10%', height: 'auto'}} src={imagen.img1} alt="login-img"/> 
          <h2 className="text-5xl text-sky-600 font-black text-center">
            Task
          </h2>
        </div>
       
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <button type="button" className="font-bold uppercase text-white text-sm md:text-lg hover:bg-gray-200 rounded-md p-1 px-2 hover:text-black transition duration-300" onClick={handleBuscador}>
            Buscar Proyectos
          </button>
            <Link to="/proyectos" className="font-bold text-sm md:text-lg  text-white hover:bg-gray-200 rounded-md p-1 px-2 hover:text-black uppercase  transition duration-300">Listado de Proyectos</Link>
            <button type="button" className="text-white text-md bg-sky-600 hover:bg-sky-800 p-3 rounded-md uppercase font-bold transition duration-300" onClick={handleCerrarSesion}>
              Cerrar Sesión
            </button>
            <Busqueda/>
        </div>
      </div>
    </header>
  )
}

export default Header