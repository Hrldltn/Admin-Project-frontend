import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'
import { useParams } from "react-router-dom"
import {toast} from 'react-toastify'


const ModalBuscarColaborador = () => {

    const [email, setEmail] = useState('')
    const params = useParams()
    const {obtenerProyecto,proyecto,colaborador,agregarColaborador,buscarColaborador,handleBuscarColaborador,modalBuscarColaborador} = useProyectos()
    
    // useEffect(() => {
    //   obtenerProyecto(params.id)
    // }, [])


    const handleSubmit = e =>{
        e.preventDefault()
    

        if([email].includes('')){
            toast.error('Todos los campos son necesarios')
            return
        }

        buscarColaborador(email)
    }

    return (
   
        <>
            <Transition.Root show={ modalBuscarColaborador} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleBuscarColaborador }>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay 
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                            />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200"
                                        onClick={ handleBuscarColaborador  }
                                    >
                                    <span className="sr-only">Cerrar</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">        
                                        <p className="text-2xl font-black">Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</p>
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit} className="bg-white py-10  w-full rounded-lg shadow px-4 ">
                                        <div className="mb-5">
                                            <label className="text-gray-700  uppercase font-bold text-md" htmlFor="email">
                                                Email Colaborador:
                                            </label>
                                            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}  placeholder="Email del colaborador" className="border-2 w-full mt-2 placeholder-gray-400 rounded-md">
                                            </input>
                                        </div>

                                        <div className="flex justify-center">
                                            <input type="submit" value="Buscar Colaborador" className="bg-sky-500  py-3 px-10 rounded text-white uppercase font-bold mt-5 hover:cursor-pointer transition duration-300 mb-5 hover:bg-sky-600  md:w-full"/>
                                        </div>
                                    </form>
                                </div>
                                {colaborador?._id && (
                                    <div className="flex justify-center border-2 border-gray-300 shadow-xl">
                                        <div className="bg-white py-10 px-5 w-full rounded-lg shadow"> 
                                            <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
                                            <div className="flex justify-between flex-col  items-center">
                                            <p className="font-bold text-black text-lg">{colaborador.nombre}{' '}{colaborador.apellido}</p>
                                            <p className="font-bold text-black text-lg">{colaborador.email}</p>
                                            <button onClick={() => agregarColaborador ({
                                                email:colaborador.email
                                            })} type="button" className="bg-slate-500  py-2 mx-5 rounded text-white text-lg md:text-md px-10 uppercase font-bold mt-5 hover:cursor-pointer mb-5 hover:bg-slate-600 ">
                                                Agregar al Proyecto
                                            </button>
                                            </div>
                                        </div>
                                    </div>

                                )}   
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
     
        )
    }
export default ModalBuscarColaborador