import { Button } from 'primereact/button';
import { auth, googleProvider } from "./config";
import { signInWithPopup} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function Login() {

    const navigate = useNavigate()


    useEffect(() => {
      if (localStorage.getItem("firebaseToken")) {
        navigate("/reservas")
      }
     }
    )
    const handleLogin = async () => {
      try {
        const a = await signInWithPopup(auth, googleProvider)
        console.log(a.user)
        localStorage.setItem("firebaseToken", a._tokenResponse.idToken)
        localStorage.setItem("user", JSON.stringify(a.user))
        navigate("/reservas")  
      } catch (error) {
        console.log(error)
      }
    }
    
      return (
        <div className='flex justify-content-center mt-5' >
          <div className='card flex justify-content-center'>
            <h1>Inicia sesión con Google para hacer tu reserva</h1>
          </div>
          <div className='card flex justify-content-center'>
            <Button onClick={handleLogin} label='Iniciar sesión con Google' />
          </div>
        </div>
      );
}

export default Login;