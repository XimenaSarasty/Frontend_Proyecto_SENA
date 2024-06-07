import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, createContext, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fondo from '/logoSena.png';
import api from '../api/token';
// import { useAuth } from '../context/AuthContext';


const Login = () => {

  // const { signin, errors: signErrors } = useAuth();

  // const onSubmited = handleLogin(async (data) => {
  //   console.log(data);
  // })

  const   [Documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!Documento || !password) {
      toast.error("Llenar todos los campos es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    localStorage.setItem("Documento", Documento);

    try {
      const body = {
        Documento: Documento,
        password: password,
      };

      const response = await api.post("/login", body);
      if (response.data) {
        const responseData = await response.data;
        const { token } = responseData;
        localStorage.setItem("token", token); 

        if (true) {
          toast.success("Inicio de sesión exitoso.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } 
      } 
    } catch (error) {
      toast.error("Credenciales Inválidas", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

   const handleDocumentoChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setDocumento(value);
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 bg-negro flex justify-center items-center md:clip-path md:clip-polygon h-full md:h-auto">
        <div className="w-1/2 text-center text-lg">
          <div className="font-inter mb-20">
            <h1 className="text-white font-normal text-4xl md:text-5xl mt-4">Bienvenido a</h1>
            <h1 className="text-white font-semibold text-4xl md:text-5xl mt-4">inventario del</h1>
            <h1 className="text-sena font-semibold text-4xl md:text-5xl mt-4">Mobiliario</h1>
          </div>
          <div className="space-y-6 text-left">
            <div className="input w-full mb-4">
              <label className="text-sm text-white block mb-1">Identificación</label>
              <div className="flex items-center border-b-2 border-white">
                <input
                  type="text"
                  className="flex-1 p-2 bg-transparent text-white focus:outline-none"
                  value={Documento}
                  onChange={handleDocumentoChange}
                />
                <FontAwesomeIcon icon={faUser} className="text-white ml-2" />
              </div>
            </div>
            <div className="input w-full mb-4">
              <label className="text-sm text-white block mb-1">Contraseña</label>
              <div className="flex items-center border-b-2 border-white">
                <input
                  type="password"
                  className="flex-1 p-2 bg-transparent text-white focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FontAwesomeIcon icon={faKey} className="text-white ml-2" />
              </div>
            </div>
            {/* <div className="input w-full mb-4">
              <label className="text-sm text-white block mb-1">Rol</label>
              <div className="flex items-start border-b-2 border-white">
                <select
                  className="flex-1 h-8 p-2 bg-input text-white text-sm focus:outline-none appearance-none"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                >
                  <option value="">Seleccione su rol</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <FontAwesomeIcon icon={faCaretDown} className="text-white ml-2" />
              </div>
            </div> */}
          </div>
          <button className="btn-primary mt-20" onClick={handleLogin}>Iniciar sesión</button>
          <div className='mt-2'>
            <NavLink to={'/contras_1'} className="text-white text-lg mt-8">Olvide mi contraseña</NavLink>
          </div>          
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center md:w-1/2 bg-fondo">
        <div className='w-1/2'>
          <img className="w-2/3 h-auto object-cover" src={fondo} alt="logoSena" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

