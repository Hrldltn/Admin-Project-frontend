import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'
import { useParams } from "react-router-dom"
import {toast} from 'react-toastify'

const ModalAgregarColaborador = () => {
    const {obtenerProyecto,proyecto,submitColaborador,handleFormularioColaborador,modalAgregarColaborador} = useProyectos()
    const params = useParams()
    const [nombre, setNombre] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [apellido , setApellido] = useState('')

    const handleSubmit = e =>{
        e.preventDefault()
    

        if([nombre.email,apellido,password].includes('')){
            toast.error('Todos los campos son necesarios')
            return
        }

        submitColaborador({nombre,email,apellido,password})
    }

      return (
        <Transition.Root show={ modalAgregarColaborador } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleFormularioColaborador }>
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
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                    onClick={ handleFormularioColaborador}
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        <p className="text-3xl font-black mb-5">Registrar Colaborador(a) al Proyecto: {proyecto.nombre}</p>
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit} className="bg-white py-10 w-full px-5  rounded-lg shadow">
                                        <input type="text" name="email"  autoComplete="username email" style={{'display': 'none'}}></input>
                                        <div className="mb-5">
                                            <label className="text-gray-700  uppercase font-bold text-sm" htmlFor="nombre">
                                                Nombre Colaborador:
                                            </label>
                                            <input id="nombre" type="text" value={nombre} autoComplete="username" onChange={e => setNombre(e.target.value)}  placeholder="Email del colaborador" className="border-2 w-full mt-2 placeholder-gray-400 rounded-md">
                                            </input>
                                        </div>
                                        <div className="mb-5">
                                            <label className="text-gray-700  uppercase font-bold text-sm" htmlFor="apellido">
                                                Apellido Colaborador:
                                            </label>
                                            <input id="apellido" type="text" value={apellido} onChange={e => setApellido(e.target.value)}  placeholder="Contraseña del colaborador" className="border-2 w-full mt-2 placeholder-gray-400 rounded-md">
                                            </input>
                                        </div>
                                        <div className="mb-5">
                                            <label className="text-gray-700  uppercase font-bold text-sm" htmlFor="password">
                                                Contraseña para el colaborador:
                                            </label>
                                            <input id="password" autoComplete="new-password" type="password" value={password} onChange={e => setPassword(e.target.value)}  placeholder="Contraseña del colaborador" className="border-2 w-full mt-2 placeholder-gray-400 rounded-md">
                                            </input>
                                        </div>
                                        <div className="mb-5">
                                            <label className="text-gray-700  uppercase font-bold text-sm" htmlFor="email">
                                                Email Colaborador:
                                            </label>
                                            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}  placeholder="Email del colaborador" className="border-2 w-full mt-2 placeholder-gray-400 rounded-md">
                                            </input>
                                        </div>
                                        <div className="flex justify-center">
                                            <input type="submit" value="Registrar Colaborador" className="bg-sky-500  py-3 px-10 rounded text-white uppercase font-bold mt-5 hover:cursor-pointer mb-5 hover:bg-sky-600  md:w-full mx-5 transition duration-300"/>
                                        </div>
                                    </form>  
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}


export default ModalAgregarColaborador
