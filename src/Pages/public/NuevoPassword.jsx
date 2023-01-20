import {useState , useEffect} from 'react'
import {Link , useParams} from 'react-router-dom'
import imagen from '../../assets/images'
import clienteAxios from '../../config/clienteAxios'
import {toast} from 'react-toastify'

const NuevoPassword = () =>{

    const [password , setPassword] = useState('')
    const [repetirPassword , setRepetirPassword] = useState('')
    const [tokenValido , setTokenValido] = useState(false)
    const [passwordModificado,setPasswordModificado] = useState(false)
    const params = useParams()
    const {token} = params

    useEffect (() =>{
        const comprobarToken = async () =>{
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                toast.error(error.response.data.msg)
            }
        }

        comprobarToken()
    },[])
    
    const handleSubmit = async e => {

        e.preventDefault()

        if([password,repetirPassword].includes('')){
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
            const {data} = await clienteAxios.post(`/usuarios/olvide-password/${token}`,{password})
            setPasswordModificado(true)
            toast.success(data.msg)
        } catch (error) {
            console.log(error.response)
        }

        setPassword('')
        setRepetirPassword('')
        
        setTimeout(() => {
            setTokenValido(false)
        }, 5000);

        
    }


    return(
        <>
            <div className="flex ">
            <div>
                <img className=" object-cover" style={{width: '90%', height: 'auto'}} src={imagen.img3} alt="contraseña-img"/> 
            </div>
            <div>
                <h1 className="font-bold text-4xl mt-5">¡Reestablece tu contraseña y no pierdas ni {" "}
                <span className="text-slate-400">tus proyectos ni tus archivos!</span></h1>
            </div>
            </div>
        
            { tokenValido && (
             <form onSubmit={handleSubmit}  className="my-10 bg-gray-300 shadow rounded-lg py-10">
                <input type="text" name="email"  autoComplete="username email" style={{'display': 'none'}}></input>
             <div className="my-5 px-5 ">
                 <label className="uppercase text-gray-600 block text-xl font-bold px-4"  htmlFor="contraseña">
                 Nueva Contraseña:
                 </label>
                 <input id="contraseña" autoComplete="new-password"  value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Ingresa tu contraseña" className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
                 </input>
             </div>
             <div className="my-5 px-5 ">
                 <label className="uppercase text-gray-600 block text-xl font-bold px-4" htmlFor="contraseña2">
                 Confirmar contraseña:
                 </label>
                 <input id="contraseña2" autoComplete="new-password"  value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} type="password"  placeholder="Confirma tu contraseña" className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
                 </input>
             </div>
             <div className="flex justify-center">
                 <input type="submit" value="Guardar nueva contraseña" className="bg-sky-500  py-3 px-10 rounded text-white uppercase font-bold mt-5 hover:cursor-pointer mb-5 hover:bg-sky-600  md:w-full mx-5"/>
             </div>
             </form>
           )}
           {passwordModificado && (
                <nav className="lg:flex lg:justify-center mt-10 text-white ">
                    <Link to ="/" className="block text-md text-center">
                        Inicia Sesión con tu cuenta Administrador
                    </Link>
                </nav>
            )}
        </>
    )
}

export default NuevoPassword