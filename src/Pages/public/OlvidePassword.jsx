import {useState} from 'react'
import {Link} from 'react-router-dom'
import imagen from '../../assets/images'
import {toast} from 'react-toastify'
import clienteAxios from '../../config/clienteAxios'

const OlvidePassword = () => {
  const [email,setEmail] = useState('')

  const handleSubmit = async e =>{
    e.preventDefault();

    if(email === '' || email < 6){
      toast.error('Debes ingresar un email')
      return
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email })
      toast.success(data.msg)
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  return (
    <>
    <div className="flex mt-5">
        <div>
          <img className=" object-cover" style={{width: '80%', height: 'auto'}} src={imagen.img3} alt="contraseña-img"/> 
        </div>
      <div>
        <h1 className="font-bold text-4xl mt-5">Recupera tu cuenta y no pierdas  {" "}
        <span className="text-slate-400">ni tus proyectos ni tus archivos!</span></h1>
      </div>
    </div>

    <form onSubmit={handleSubmit} className="my-10 bg-gray-300 shadow rounded-lg py-10">

      <div className="my-5 px-5 ">
        <label className="uppercase text-gray-600 block text-xl font-bold px-4" htmlFor="email">
          Correo:
        </label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ingresa tu correo" className="w-full mt-3 p-3 border rounded-xl bg-gray-50">

        </input>
      </div>
     
      <div className="flex justify-center">
        <input type="submit" value="Recuperar cuenta" className="bg-sky-500  py-3 px-10 rounded text-white uppercase font-bold mt-5 hover:cursor-pointer mb-5 hover:bg-sky-600  md:w-full mx-5"/>
      </div>
    </form>

    <nav className="lg:flex lg:justify-between text-white">
      <Link to ="/registrar" className="block text-center text-md ">
        ¿No tienes una cuenta ? Registrate
      </Link>
    </nav>
  </>
  )
}

export default OlvidePassword
