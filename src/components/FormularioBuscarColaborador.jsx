import {useState} from 'react'
import {toast} from 'react-toastify'
import useProyectos from '../hooks/useProyectos'

const FormularioBuscarColaborador = () => {
    const [email, setEmail] = useState('')


    const {buscarColaborador} = useProyectos()

    const handleSubmit = e =>{
        e.preventDefault()
    

        if([email].includes('')){
            toast.error('Todos los campos son necesarios')
            return
        }

        buscarColaborador(email)
    }

  return (
    <form onSubmit={handleSubmit} className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">

        <div className="mb-5">
            <label className="text-gray-700  uppercase font-bold text-sm" htmlFor="email">
                Email Colaborador:
            </label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}  placeholder="Email del colaborador" className="border-2 w-full mt-2 placeholder-gray-400 rounded-md">
            </input>
        </div>
       
        <div className="flex justify-center">
            <input type="submit" value="Buscar Colaborador" className="bg-sky-500  py-3 px-10 rounded text-white uppercase font-bold mt-5 hover:cursor-pointer transition duration-300 mb-5 hover:bg-sky-600  md:w-full mx-5"/>
        </div>
    </form>
  )
}

export default FormularioBuscarColaborador
