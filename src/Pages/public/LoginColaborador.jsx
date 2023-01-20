import {useState} from 'react'
import imagen from '../../assets/images'
import {toast} from 'react-toastify'
const LoginColaborador = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')


    const handleSubmit = async e =>{ 
        e.preventDefault()

        if([email,password].includes('')){
        toast.error('Todos los campos son necesarios')
        return
        }

       
    }

    return (
        <>
          <div className="flex mt-5">
            <div>
              <img className=" object-cover" style={{width: '100%', height: 'auto'}} src={imagen.img1} alt="login-img"/> 
            </div>
            <div>
              <h1 className="font-bold text-4xl mt-5">¡Inicia sesión como Colaborado!</h1>
            </div>
          </div>
        
            <form  onSubmit={handleSubmit} className="my-5 bg-gray-300 shadow rounded-lg py-10">
                <div className="my-5 px-5 ">
                <label className="uppercase text-gray-600 block text-xl font-bold px-4" htmlFor="email">
                    Correo:
                </label>
                <input id="email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo de ingreso" className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
        
                </input>
                </div>
                <div className="my-5 px-5 ">
                <label className="uppercase text-gray-600 block text-xl font-bold px-4" htmlFor="contraseña">
                    Contraseña:
                </label>
                <input id="contraseña" type="password" autoComplete="new-password"  value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña de ingreso" className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
                </input>
                </div>
                <div className="flex justify-center">
                <input type="submit" value="Iniciar Sesión" className="bg-sky-500  py-3 px-10 rounded text-white uppercase font-bold mt-5 hover:cursor-pointer mb-5 hover:bg-sky-600  md:w-full mx-5"/>
                </div>
            </form>
          </>
  )
}

export default LoginColaborador
