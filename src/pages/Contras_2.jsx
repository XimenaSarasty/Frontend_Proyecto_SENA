import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import fondo from '/logoSena.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contras_2 = () => {
    const navigate = useNavigate();
    const [identificacion, setIdentificacion] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('');
  
    const mensajeExito = () => {
      toast.success('¡Inicio de sesión exitoso!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate('/home'), 3000);
    }
  
    const mensajeError = () => {
      toast.error('¡Tienes que llenar todos los campos!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  
    const handleLogin = () => {
      if (identificacion === '' || contrasena === '' || rol === '') {
        mensajeError();
      } else {
        mensajeExito();
      }
    }
  
    const handleIdentificacionChange = (e) => {
      const value = e.target.value;
      if (/^[0-9]*$/.test(value) && value.length <= 10) {
        setIdentificacion(value);
      }
    }
  
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 bg-negro flex justify-center items-center md:clip-path md:clip-polygon h-full md:h-auto">
          <div className="w-1/2 text-center text-lg">
            <div className="font-inter mb-20">
              <h1 className="text-white font-normal text-4xl md:text-5xl mt-4">Confirme su dirección</h1>
              <h1 className="text-white font-normal text-4xl md:text-5xl mt-4">de correo electrónico</h1>
            </div>

            <div className="space-y-6 text-center">
              <h1 className="text-white font-normal text-xl md:text-2xl mb-20">Código de verificación enviado a:</h1>
              <h1 className="text-white font-normal text-xl md:text-2xl mb-20"></h1>
            </div>

            <div className="grid grid-cols-6 gap-4 mt-4">
              <div className="input bg-gray-800 p-4">
                <input className="text-4xl text-white block mb-1 bg-transparent focus:outline-none p-2" />
              </div>
              <div className="input bg-gray-800 p-4">
                <input className="text-4xl text-white block mb-1 bg-transparent focus:outline-none p-2" />
              </div>
              <div className="input bg-gray-800 p-4">
                <input className="text-4xl text-white block mb-1 bg-transparent focus:outline-none p-2" />
              </div>
              <div className="input bg-gray-800 p-4">
                <input className="text-4xl text-white block mb-1 bg-transparent focus:outline-none p-2" />
              </div>
              <div className="input bg-gray-800 p-4">
                <input className="text-4xl text-white block mb-1 bg-transparent focus:outline-none p-2" />
              </div>
              <div className="input bg-gray-800 p-4">
                <input className="text-4xl text-white block mb-1 bg-transparent focus:outline-none p-2" />
              </div>
            </div>


            <button className="btn-primary mt-20" onClick={handleLogin}>Confirmar correo</button>
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

export default Contras_2
