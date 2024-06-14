import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import fondo from '/logoSena.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usuarioSchemas } from '../../../Backend_Sena/src/schemas/Usuario.schemas';

const Contra_3 = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    setTimeout(() => navigate('/'), 3000);
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    if (value.length <= 20) {
      setPassword(value);

      const passwordValidation = usuarioSchemas.pick({ password: true });
      const validationResult = passwordValidation.safeParse({
        password: value,
      });

      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0].message;
        setPasswordError(firstError);
      } else {
        setPasswordError(""); 
      }
    }
  };

  const handleChange = () => {

    if (!password) {
      toast.error("La contraseña es requerida", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    mensajeExito();
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-fondo">
      <div className="w-full md:w-1/2 bg-negro flex justify-center items-center md:clip-path md:clip-polygon h-full md:h-auto">
        <div className="w-1/2 text-center text-lg">
          <div className="font-inter mb-20">
            <h1 className="text-white font-normal text-4xl md:text-5xl mt-4">Nueva contraseña</h1>
          </div>
          <div className="space-y-6 text-center mb-20">
            <h1 className="text-white font-normal text-xl md:text-2xl">Por favor escriba su nueva contraseña.</h1>
          </div>
          <div className="space-y-6 text-left">
            <div className="input w-full mb-4">
              <label className="text-sm text-white block mb-1">Contraseña</label>
              <div className="flex items-center border-b-2 border-white">
                <input
                  type="password"
                  className="flex-1 p-2 bg-transparent text-white focus:outline-none"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <FontAwesomeIcon icon={faKey} className="text-white ml-2" />
              </div>
              {passwordError && (
                <div className="text-red-400 text-sm mt-1">{passwordError}</div>
              )}
            </div>
          </div>
          <button className="btn-primary mt-20" onClick={handleChange}>Confirmar contraseña</button>
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

export default Contra_3;
