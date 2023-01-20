import {useState,useEffect} from 'react'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import imagen from '../../assets/images'
import clienteAxios from '../../config/clienteAxios'

const TIPO = ['Administrador','Colaborador']

const Registrar = () => {
  const [ nombre , setNombre] = useState('')
  const [ tipo , setTipo] = useState('')
  const [ apellido , setApellido] = useState('')
  const [ email , setEmail] = useState('')
  const [ password , setPassword] = useState('')
  const [ repetirPassword , setRepetirPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre,apellido,email,password,repetirPassword,tipo].includes('')){
      toast.error('Todos los campos son necesarios')
      return
    }

    if(password !== repetirPassword){
      toast.error('Las contraseñas deben ser iguales')
      return
    }

    if(password.length < 6 ){
      toast.error('La contraseña no debe ser menor a 6 caracteres')
      return
    }

    try {
      const {data} = await clienteAxios.post(`/usuarios`,{tipo,nombre,apellido,email,password})
      toast.success(data.msg)
      setEmail('')
      setNombre('')
      setApellido('')
      setPassword('')
      setRepetirPassword('')
    } catch (error) {
      toast.error(error.response.data.msg)
      return
    }
  }

  return (
    <>
    <div className="flex mt-5">
      <div>
        <img className=" object-cover" style={{width: '85%', height: 'auto'}} src={imagen.img2} alt="perros-img"/> 
      </div>
      <div>
        <h1 className="font-bold text-4xl mt-5">¡Crea tu cuenta y administra  {" "}
        <span className="text-slate-400">tus proyectos y archivos!</span></h1>
      </div>
    </div>

    <form onSubmit={handleSubmit} className="my-10 bg-gray-300 shadow rounded-lg py-10">
      <div className="my-5 px-5 ">
          <label className="uppercase text-gray-600 block text-xl font-bold px-4" htmlFor="Nombre">
            Nombre:
          </label>
          <input id="Nombre" value={nombre} onChange={e => setNombre(e.target.value)}  type="text" placeholder="Ingresa tu nombre" className="w-full mt-3 p-3 border rounded-xl bg-gray-50">

          </input>
      </div>
      <div className="my-5 px-5 ">
          <label className="uppercase text-gray-600 block text-xl font-bold px-4" htmlFor="Apellido">
            Apellido:
          </label>
          <input id="Apellido" value={apellido} onChange={e => setApellido(e.target.value)}  type="text" placeholder="Ingresa tu apellido" className="w-full mt-3 p-3 border rounded-xl bg-gray-50">

          </input>
      </div>
      <div className="my-5 px-5 ">
        <label className="uppercase text-gray-600 block text-xl font-bold px-4" htmlFor="email">
          Correo:
        </label>
        <input id="email" type="email" value={email} autoComplete="username" onChange={e => setEmail(e.target.value)} placeholder="Ingresa tu correo" className="w-full mt-3 p-3 border rounded-xl bg-gray-50">

        </input>
      </div>
      <div className="my-5 px-5 ">
        <label className="uppercase text-gray-600 block text-xl font-bold px-4" htmlFor="contraseña">
          Contraseña:
        </label>
        <input id="contraseña" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
        </input>
      </div>
      <div className="my-5 px-5 ">
        <label className="uppercase text-gray-600 block text-xl font-bold px-4" htmlFor="contraseña2">
          Confirmar contraseña:
        </label>
        <input id="contraseña2" type="password" autoComplete="new-password" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} placeholder="Confirma tu contraseña" className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
        </input>
      </div>
      <div className="my-5 px-5 ">
          <label className="uppercase text-gray-600 block text-xl font-bold px-4" htmlFor="contraseña2">
            Tipo de usuario:
          </label>
          <select id="prioridad" value={tipo} onChange={e => setTipo(e.target.value)}  className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
              <option value="" disabled>---Seleccionar---</option>
              {TIPO.map(opcion =>(
                  <option key={opcion}>{opcion}</option>
              ))}
          </select>
      </div>
      <div className="flex justify-center">
        <input type="submit" value="Registrar cuenta" className="bg-sky-500  py-3 px-10 rounded text-white uppercase font-bold mt-5 hover:cursor-pointer mb-5 hover:bg-sky-600  md:w-full mx-5"/>
      </div>
    </form>

    <nav className="lg:flex lg:justify-between text-white">
      <Link to ="/" className="block text-center text-md ">
        Inicia Sesión con tu cuenta Administrador
      </Link>
      <Link to ="/olvide-password" className="block text-center text-md ">
        Recupera tu contraseña
      </Link>
    </nav>
  </>
  )
}

export default Registrar
