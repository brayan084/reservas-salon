import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { auth } from "./firebase/config";
import { useNavigate } from 'react-router-dom';

import Login from './firebase/login';
import Reservas from './componetes/Reservas';
import Navbar from './componetes/Menu';
import Calendario from './componetes/Calendario';
import UsuarioConfig from './componetes/UsuarioConfig';
import ListaDeSalones from './componetes/Salones';
import Home from './componetes/Home';


const PrivateRoute = ({ redirectPath = "/", children }) => {

  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem("firebaseToken")
    if (token) {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          navigate(redirectPath)
        }
      })
    } else {
      navigate(redirectPath)
    }
  }, [navigate, redirectPath])

  return children
}


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Login /> <Home /> </>} />
          <Route path="/reservas" element={<><PrivateRoute> <Navbar /> <Reservas /> </PrivateRoute> </>} />
          <Route path="/salones" element={<><PrivateRoute> <Navbar /> <ListaDeSalones />  </PrivateRoute> </>} />
          <Route path="/calendario" element={<><PrivateRoute> <Navbar /> <Calendario /> </PrivateRoute> </>} />
          <Route path="/usuario" element={<><PrivateRoute> <Navbar /> <UsuarioConfig /> </PrivateRoute> </>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
