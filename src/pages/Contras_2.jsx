import { useNavigate } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import fondo from '/logoSena.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contras_2 = () => {
  const navigate = useNavigate();
  const [Documento, setDocumentox] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('');
  const [code, setCode] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  const mensajeExito = () => {
    toast.success('¡Código correcto!', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => navigate('/contras_3'), 3000);
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
    if (code.includes('')) {
      mensajeError();
    } else {
      mensajeExito();
    }
  }

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = '';
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-fondo">
      <div className="w-full md:w-1/2 bg-negro flex justify-center items-center md:clip-path md:clip-polygon h-full md:h-auto">
        <div className="w-3/4 text-center text-lg">
          <div className="font-inter mb-20">
            <h1 className="text-white font-normal text-4xl md:text-5xl mt-4">Confirme su dirección</h1>
            <h1 className="text-white font-normal text-4xl md:text-5xl mt-4">de correo electrónico</h1>
          </div>

          <div className="space-y-6 text-center mb-20">
            <h1 className="text-white font-normal text-xl md:text-2xl">Código de verificación enviado a:</h1>
            <h1 className="text-correo font-normal text-xl md:text-2xl">correo@correo.com</h1>
          </div>

          <div className="grid grid-cols-6 gap-4 mt-4 px-2 w-3/4 mx-auto">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="input bg-gray-800 p-4">
                <input
                  ref={el => inputRefs.current[index] = el}
                  className="text-4xl text-white block mb-1 bg-transparent focus:outline-none p-2"
                  maxLength="1"
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            ))}
          </div>

          <button
            className={`btn-primary mt-20 ${code.includes('') ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleLogin}
            disabled={code.includes('')}
          >
            Confirmar correo
          </button>
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

export default Contras_2;
