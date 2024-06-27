import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fondo from '/logoSena.png';

const Contras_1 = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');

  const mensajeExito = () => {
    toast.success('¡Código de recuperación enviado!', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setTimeout(() => navigate('/contras_2'), 3000);
  }

  const mensajeError = () => {
    toast.error('¡Tienes que usar un correo válido!', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });
  }

  const handleEmail = () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      mensajeExito();
    } else {
      mensajeError();
    }
  }

  const handleEmailChange = (e) => {
    setCorreo(e.target.value);
  }

  return (
    <div className='pagina flex flex-col md:flex-row h-screen bg-fondo'>
      <div className='w-full md:w-1/2 bg-negro flex justify-center items-center md:clip-path md:clip-polygon h-full md:h-auto'>
        <div className='main w-3/4 md:w-1/2 text-center text-lg'>
          <div className='letras font-inter mb-20 md:mb-8'>
            <h1 className='text-white font-normal text-4xl md:text-5xl mt-6'>¿Has olvidado</h1>
            <h1 className='text-white font-normal text-4xl md:text-5xl mt-4'>tu contraseña?</h1>              
          </div>
          <div className='space-y-6 md:space-y-6 text-center'>
              <h1 className='text-white font-normal text-xl md:text-2xl mt-15 mb-20'>Escriba su correo electrónico para recibir un código de
               confirmación para establecer una nueva contraseña.</h1>
          </div>
          <div className='space-y-6 text-left mt-4'>
            <div className='input w-full mb-4 relative'>
              <label className='text-sm text-white block mb-1'>Correo electrónico</label>
              <div className='flex items-center border-b-2 border-white'>
                <input
                  type='text'
                  className='flex-1 p-2 bg-transparent text-white focus:outline-none pr-10'
                  value={correo}
                  onChange={handleEmailChange}
                />
                <FontAwesomeIcon icon={faEnvelope} className='absolute right-2 text-white ml-2'/>
              </div>
            </div>
          </div>
          <button className='btn-primary mt-10' onClick={handleEmail}>Confirmar correo</button>
        </div>
      </div>
      <div className='hidden md:flex items-center justify-center md:w-1/2 bg-fondo'>
        <div className='w-1/2'>
          <img className='w-2/3 h-auto object-cover' src={fondo} alt='logoSena' />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contras_1;