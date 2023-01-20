//dependencias
import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

//provider
import { AuthProvider } from './context/AuthProvider'
import { ProyectosProvider } from './context/ProyectosProvider'

//layouts
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

//publicas
import Login from './Pages/public/Login'
import Registrar from './Pages/public/Registrar'
import OlvidePassword from './Pages/public/OlvidePassword'
import NuevoPassword from './Pages/public/NuevoPassword'
import ConfirmarCuenta from './Pages/public/ConfirmarCuenta'

//proyecto
import Proyectos from './Pages/admin/Proyectos'
import Proyecto from './Pages/admin/Proyecto'



function App() {
  

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
            <Routes>
                  <Route path="/" element={<AuthLayout />}>
                        <Route index element={<Login />} />
                        <Route path="registrar" element={<Registrar />} />
                        <Route path="olvide-password" element={<OlvidePassword />} />
                        <Route path="olvide-password/:token" element={<NuevoPassword />} />
                        <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                  </Route>
                  <Route path="/proyectos" element={<RutaProtegida/>}>
                    <Route index element={<Proyectos/>}/>
                    <Route path=":id" element={<Proyecto />} />
                  </Route>
            </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
     
  )
}

export default App
