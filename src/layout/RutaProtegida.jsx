import {Outlet,Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'

const RutaProtegida = () => {

    const {auth,cargando} = useAuth()
    

  return (
    cargando ? 
    <Spinner></Spinner> 
    :
    <>
        {auth._id ? 
        (
          <div className="bg-gray-300 ">
              <Header/>
            <div className="md:flex md:min-h-screen pt-16">
              <Sidebar/>
              <main className="flex-1 p-10">
                <Outlet/>
                <ToastContainer limit={2} autoClose={3000}/>
              </main>
            </div>
          </div>
        )
        
        : <Navigate to="/" />}
    </>
  )
}

export default RutaProtegida