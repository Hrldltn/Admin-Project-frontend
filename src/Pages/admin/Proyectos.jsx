import {useState,useEffect} from 'react'
import useProyectos from '../../hooks/useProyectos'
import PreviewProyecto from '../../components/PreviewProyecto'
import Spinner from '../../components/Spinner'
import ModalFormularioProyecto from '../../components/ModalFormularioProyecto'


const Proyectos = () => {
  const {proyectos,cargando} = useProyectos()


  
  return (
    <>
        <h1 className="text-4xl font-black">Listado de proyectos</h1>
          <div className="bg-white shadow mt-10 rounded-lg">
          {proyectos.length ? 
            proyectos.map(proyecto =>(
                  <PreviewProyecto 
                    key={proyecto._id}
                    proyecto={proyecto}
                />
            ))
          :
            <p className="text-2xl font-black text-center uppercase p-5">
              No tienes proyectos creados
            </p>}
        </div>
        <ModalFormularioProyecto/>
      </>
  )
}

export default Proyectos