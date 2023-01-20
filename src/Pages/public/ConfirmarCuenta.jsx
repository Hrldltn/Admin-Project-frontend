import { useEffect,useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import imagen from '../../assets/images'
import clienteAxios from '../../config/clienteAxios'
import {toast} from 'react-toastify'

const ConfirmarCuenta = () => {

  const [confirmada ,setConfirmada]=useState(false)

  const params = useParams()
  const {id} = params

  useEffect(() =>{
    const confirmarCuenta = async()=>{
      try {
        const {data} = await clienteAxios(`/usuarios/confirmar/${id}`)
        toast.success(data.msg)
        setConfirmada(true)
      } catch (error) {
        toast.error(error.response.data.msg)
      }
    }
    confirmarCuenta()
  },[])

  return (
    <>
        <div className="flex mt-20 ">
          <div>
              <img className=" object-cover" style={{width: '90%', height: 'auto'}} src={imagen.img4} alt="contraseña-img"/> 
          </div>
          
            <div>
                <h1 className="font-bold text-4xl mt-5">Tu cuenta ya esta Confirmada y ya puedes{" "}
                <span className="text-slate-400">administrar tus archivos y proyectos</span></h1>
            </div>
        </div>
     
      {confirmada && (
          <nav className="lg:flex lg:justify-center mt-10 text-white ">
          <Link to ="/" className="block text-md text-center">
            Inicia Sesión con tu cuenta Administrador
          </Link>
        </nav>
      )}
      
    </>
  )
}

export default ConfirmarCuenta
