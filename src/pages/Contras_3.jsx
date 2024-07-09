import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import fondo from '/logoSena.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const Contras_3 = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const savedCorreo = Cookies.get('correo');
    if (savedCorreo) {
      setCorreo(savedCorreo);
    }
  }, []);

  const mensajeExito = () => {
    toast.success('¡Cambio de contraseña correcto!', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      Cookies.remove('cambiopass'); 
      Cookies.remove('correo');
      Cookies.remove('recuperacion');
      navigate('/');
    }, 3000);
  };

  const mensajeError = (mensaje) => {
    toast.error(mensaje, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.put('http://localhost:9100/nuevo-password',
        { correo, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        mensajeExito();
      } 
      else {
        mensajeError('Error al actualizar la contraseña');
      }
    } catch (error) {
      console.error('Error en handleLogin:', error);
      if (error.response) {
        console.error('Detalles del error:', error.response);
        if (error.response.data.message) {
          mensajeError(error.response.data.message);
        } else {
          mensajeError('Error al actualizar la contraseña');
        }
      } else {
        mensajeError('Error al actualizar la contraseña');      
    }
  }
};

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    if (value.length <= 20) {
      setPassword(value);

      const errors = [];

      if (value.length < 6) {
        errors.push("La contraseña debe tener mínimo 6 caracteres");
      } else if (value.length > 20) {
        errors.push("La contraseña debe tener máximo 20 caracteres");
      }

      if (!/[\W_]/.test(value)) {
        errors.push("La contraseña debe contener al menos un carácter especial");
      }

      if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
        errors.push("La contraseña debe contener al menos una letra minúscula y una mayúscula");
      }

      if (errors.length > 0) {
        setPasswordError(errors[0]);
      } else {
        setPasswordError("");
      }
    }
  };

  const handleEmailChange = (e) => {
    setCorreo(e.target.value);
  };


  return (
    <div className="pagina flex flex-col md:flex-row h-screen bg-fondo">
      <div className="w-full md:w-1/2 bg-negro flex justify-center items-center md:clip-path h-full md:h-auto">
        <div className="main w-3/4 md:w-1/2 text-center text-lg">
          <div className="letras-3 font-inter mb-20 md:mb-8">
            <h6 className="text-white font-normal text-4xl md:text-5xl mt-4">Nueva contraseña</h6>
          </div>
          <div className="space-y-6 md_space-y-6 text-center">
            <h1 className="text-white font-normal text-xl md:text-2xl mb-10">Por favor escriba su nueva contraseña.</h1>
          </div>
          <div className="space-y-6 text-left">
            <div className="input w-full mb- relative">
              <label className="text-sm text-white block">Correo electrónico</label>
              <div className="flex items-center border-b-2 border-white">
                <input
                  type="text"
                  className="flex-1 p-2 bg-transparent text-white focus:outline-none pr-10"
                  value={correo}
                  readOnly
                  onChange={handleEmailChange}
                />
                <FontAwesomeIcon icon={faEnvelope} className="absolute right-2 text-white ml-2" />
              </div>
            </div>
            <div className="input w-full mb-2 relative">
              <label className="text-sm text-white block">Contraseña</label>
              <div className="flex items-center border-b-2 border-white">
                <input
                  type="password"
                  className="flex-1 p-2 bg-transparent text-white focus:outline-none pr-10"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <FontAwesomeIcon icon={faKey} className="absolute right-2 text-white ml-2" />
              </div>
              {passwordError && (
                <div className="text-red-400 text-sm mt-1">{passwordError}</div>
              )}
            </div>
          </div>
          <div className='mb-2'>
            <button className="btn-primary mt-20" onClick={handleLogin}>Confirmar contraseña</button>
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

export default Contras_3;
