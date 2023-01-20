import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/clienteAxios'
import {toast} from 'react-toastify'
import {useNavigate,useParams} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client'

let socket 

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {

  const [proyectos, setProyectos] = useState([])
  const [proyecto, setProyecto] = useState({})
  const [tarea , setTarea] = useState({})
  const [colaborador, setColaborador] = useState({})
  const [idProyecto,setIdProyecto] = useState('')
  const [cargando, setCargando] = useState(false)
  const [buscador,setBuscador] = useState(false)
  const [modalBuscarColaborador,setModalBuscarColaborador]=useState(false)
  const [modalAgregarColaborador,setModalAgregarColaborador]=useState(false)
  const [modalFormularioTarea,setModalFormularioTarea]=useState(false)
  const [modalFormularioProyecto,setModalFormularioProyecto]=useState(false)
  const [modalEliminarTarea,setModalEliminarTarea]=useState(false)
  const [modalEliminarProyecto,setModalEliminarProyecto]=useState(false)
  const [modalEliminarColaborador,setModalEliminarColaborador]=useState(false)

  const Navigate = useNavigate()
  const { auth } = useAuth()
  const params = useParams()

  useEffect(() =>{
    const obtenerProyectos = async () =>{
     
      try {

        const token = localStorage.getItem('Task session')

        if(!token) return 
        
        const config ={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          }
        }
        
        const {data} = await clienteAxios('/proyectos',config)
        
        setProyectos(data)
      
      } catch (error) {
        console.log(error)
      
      } 
  
    }
    obtenerProyectos()
  },[auth,proyectos])
  

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)

  }, [])
  


  const sumbitProyecto= async proyecto =>{

    if(proyecto.id){
      await editarProyecto(proyecto)
      
    }else{
      await nuevoProyecto(proyecto)
    }
  } 

  const nuevoProyecto = async proyecto =>{
      try {

        const token = localStorage.getItem('Task session')

        if(!token){
          toast.error('No tienes acceso para realizar esta acción')
          return
        } 

        const config ={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          }
        }
        
        const {data} = await clienteAxios.post('/proyectos',proyecto,config)
        const proyectoActualizado = {...proyectos,data}
 
        setProyectos(proyectoActualizado)
        toast.success(data.msg)
        setModalFormularioProyecto(false)

        setTimeout(() => {
          Navigate('/proyectos')
        }, 1000);

      } catch (error) {
        console.log(error.response)
      }
  }

    
  const editarProyecto = async proyecto =>{
    try {

      const token = localStorage.getItem('Task session')

      if(!token){
        toast.error('No tienes acceso para realizar esta acción')
        return
      } 

      const config ={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto,config)
      
      //sincronizar state 
      const proyectoActualizado = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
      setProyectos(proyectoActualizado)
      setModalFormularioProyecto(false)
      toast.success(data.msg)

      setTimeout(() => {
        Navigate(`/proyectos`)
      }, 1000);
 

    } catch (error) {
      console.log(error)
    }
  }


  const obtenerProyecto = async id =>{

    setCargando(true)

    try {
      const token = localStorage.getItem('Task session')

      if(!token) return 

      const config ={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const {data} = await clienteAxios(`/proyectos/${id}`,config)
      setProyecto(data)

    } catch (error) {
      toast.error(error.response.data.msg)

    } finally {
      setCargando(false)
    }

  }
  
  
  const handleFormularioProyecto = () =>{
    setModalFormularioProyecto(!modalFormularioProyecto)
  }

  const handleModalEliminarProyecto = proyecto =>{
    setIdProyecto(proyecto)
    setModalEliminarProyecto(!modalEliminarProyecto)
  }

  const handleBuscarColaborador = () =>{
    setModalBuscarColaborador(!modalBuscarColaborador)
  }

  const handleFormularioColaborador = () =>{
    setModalAgregarColaborador(!modalAgregarColaborador)
  }

  const handleModalTarea = () =>{
    setModalFormularioTarea(!modalFormularioTarea)
    setTarea({})
  }

  const handleModalEditarTarea = tarea =>{
    setTarea(tarea)
    setModalFormularioTarea(true)
  }
  
  const handleModalEliminarTarea = tarea =>{
    setTarea(tarea)
    setModalEliminarTarea(!modalEliminarTarea)
  }
  
  
  const handleModalEliminarColaborador = colaborador =>{
    setModalEliminarColaborador(!modalEliminarColaborador)
    setColaborador(colaborador)
  }
  

  const eliminarProyecto = async () =>{
      try {
        const token = localStorage.getItem('Task session')
  
        if(!token) return 
  
        const config ={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          }
        }
        const { data } = await clienteAxios.delete(`/proyectos/${idProyecto}`,config)
        setModalEliminarProyecto(false)
        toast.success(data.msg)
        setProyecto({})
        setTimeout(() => {
          Navigate('/proyectos')
        }, 1000);
  
      } catch (error) {
        toast.success(error)
      }
  }



  const submitTarea = async tarea =>{
    if(tarea?.id){
      await editarTarea(tarea)
    }else{
      await crearTarea(tarea)
    }
  }


  const crearTarea= async tarea =>{
    try {
      const token = localStorage.getItem('Task session')

      if(!token) return 

      const config ={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post('/tareas',tarea,config)
      toast.success('Tarea agregada correctamente')
      setModalFormularioTarea(false)
      //socket io
      socket.emit('nueva tarea',data)

    } catch (error) {
      console.log(error)
    }

  }

  const editarTarea = async tarea =>{
    try {
      const token = localStorage.getItem('Task session')

      if(!token) return 

      const config ={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.put(`/tareas/${tarea.id}`,tarea,config)

      toast.success('Editado correctamente')
      setModalFormularioTarea(false)

      //socket
      socket.emit('actualizar tarea',data)
    } catch (error) {
      console.log(error)
    }
  }


  const eliminarTarea = async () =>{
    try {
      const token = localStorage.getItem('Task session')

      if(!token) return 

      const config ={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`,config)
      setModalEliminarTarea(false)
      
      //socket 
      socket.emit('eliminar tarea',tarea)

      toast.success(data.msg)
      setTarea({})
    } catch (error) {
      console.log(error)
    }
  }
  
  const submitColaborador = async colaborador  =>{
    try {
      const token = localStorage.getItem('Task session')

      if(!token) return 

      const config ={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/proyectos/colaboradores`,colaborador,config)

      toast.success(data.msg)
      setModalAgregarColaborador(false)
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  const buscarColaborador = async email  =>{
    setCargando(true)
    try {
      const token = localStorage.getItem('Task session')

      if(!token) return 

      const config ={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/proyectos/buscar-colaborador`,{email},config)
      setColaborador(data)
      
    } catch (error) {
      toast.error(error.response.data.msg)
      return
    } finally{
      setCargando(false)
    }
  }

  const agregarColaborador= async email =>{
    try {
      const token = localStorage.getItem('Task session')

      if(!token) return 

      const config ={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`,email,config)
      toast.success(data.msg)
      setModalBuscarColaborador(false)
      setColaborador({})
      window.location.reload(false)
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  const eliminarColaborador = async () =>{
    try {
      const token = localStorage.getItem('Task session')

      if(!token) return 

      const config ={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`,{id: colaborador._id},config)
      const proyectoActualizado = {...proyecto}
      proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
      setProyecto(proyectoActualizado)

      toast.success(data.msg)

      setColaborador({})
      setModalEliminarColaborador(false)
      
      setTimeout(() => {
        Navigate(`/proyectos/${proyecto._id}`)
      }, 1000);
      
    } catch (error) {
      console.log(error)
    }
  }

  const completarTarea = async id =>{
    try {
      const token = localStorage.getItem('Task session')

      if(!token) return 

      const config ={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/tareas/estado/${id}`,{},config)

      //socket 
      socket.emit('cambiar estado',data)

    } catch (error) {
      console.log(error.response)
    }
  }

  const handleBuscador = () =>{
    setBuscador(!buscador)
  }

  //socket io
  const submitTareasProyecto = (tarea) =>{
        //agrega tarea al state
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas=[...proyectoActualizado.tareas,tarea]
        setProyecto(proyectoActualizado)
  }

  const eliminarTareaProyecto = tarea =>{  
    const proyectoActualizado = {...proyecto}
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id)
    setProyecto(proyectoActualizado)
  }

  const cerrarSesion = () =>{
    localStorage.removeItem('Task session');
    setProyecto({})
    setProyectos({})
    setTimeout(() => {
      Navigate('/')
    }, 2000);
  }

  const actualizarTareaProyecto = tarea =>{
    const proyectoActualizado = {...proyecto}
    proyectoActualizado.tareas=proyectoActualizado.tareas.map(tareaState =>
    tareaState._id === tarea._id ? tarea : tareaState)
    setProyecto(proyectoActualizado)
  }

  const cambiarEstadoTarea = tarea =>{
    const proyectoActualizado = {...proyecto}
    proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => 
    tareaState._id === tarea._id ? tarea : tareaState)
    setProyecto(proyectoActualizado)
  }
  return (
    <ProyectosContext.Provider
        value={{
            proyectos,
            sumbitProyecto,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto,
            handleModalTarea,
            modalFormularioTarea,
            submitTarea,
            handleModalEditarTarea,
            tarea,
            handleModalEliminarTarea,
            modalEliminarTarea,
            eliminarTarea,
            handleModalEliminarProyecto,
            modalEliminarProyecto,
            submitColaborador,
            buscarColaborador,
            colaborador,
            agregarColaborador,
            handleModalEliminarColaborador,
            modalEliminarColaborador,
            eliminarColaborador,
            handleFormularioProyecto,
            modalFormularioProyecto,
            completarTarea,
            handleFormularioColaborador,
            modalAgregarColaborador,
            handleBuscarColaborador,
            modalBuscarColaborador,
            buscador,
            handleBuscador,
            cerrarSesion,
            submitTareasProyecto,
            eliminarTareaProyecto,
            actualizarTareaProyecto,
            cambiarEstadoTarea

        }}
    >{children}
    </ProyectosContext.Provider>
  )
}

export {
    ProyectosProvider
}

export default ProyectosContext