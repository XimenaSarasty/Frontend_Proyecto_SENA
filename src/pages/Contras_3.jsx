import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'; // al
import fondo from '/logoSena.png'; // logo del sena
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons'; // Dependencias para los iconos 
import { ToastContainer, toast } from 'react-toastify'; //Dependencias para las alertas
import 'react-toastify/dist/ReactToastify.css'; // estilos de las dependencias para las alertas

const Contra_3 = () => {
    const navigate = useNavigate();
    const [contrasena, setContrasena] = useState('');

    const mensajeExito = () => {
      toast.success('¡Cambio de contraseña correcto!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setTimeout(() => navigate('/'), 3000);
    }
  
    const mensajeError = () => {
      toast.error('¡Tienes que llenar todos los campos!', {
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
  
    const handleLogin = () => {
      if (contrasena === '') {
        mensajeError();
      } else {
        mensajeExito();
      }
    }
  
 
    return (
      <div className='pagina flex flex-col md:flex-row h-screen bg-fondo'>
        <div className='w-full md:w-1/2 bg-negro flex justify-center items-center md:clip-path md:clip-polygon h-full md:h-auto'>
          <div className='main w-3/4 md:w-1/2  text-center text-lg'>
            <div className='letras-3 font-inter mb-20 md:mb-8'>
              <h1 className='text-white font-normal text-4xl md:text-5xl mt-4'>Nueva contraseña</h1>
            </div>
            <div className='space-y-6 md_space-y-6 text-center'>
              <h1 className='text-white font-normal text-xl md:text-2xl mb-20'>Por favor escriba su nueva contraseña.</h1>
            </div>
            <div className='space-y-6 text-left'>
              <div className='input w-full mb-4 relative'>
                <label className='text-sm text-white block mb-1'>Contraseña</label>
                <div className='flex items-center border-b-2 border-white'>
                  <input
                    type='password'
                    className='flex-1 p-2 bg-transparent text-white focus:outline-none pr-10'
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faKey} className='absolute right-2 text-white ml-2' />
                </div>
              </div>
            </div>
            <div className='mt-10 mb-10'>
              <button className='btn-primary mt-20' onClick={handleLogin}>Confirmar contraseña</button>
            </div>
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
export default Contra_3