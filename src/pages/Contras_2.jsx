// import React, { useState, useEffect } from 'react';
// import { api } from '../api/token';
// import fondo from '/logoSena.png';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const Contras_2 = () => {
//   const [code, setCode] = useState('');
//   const [correo, setCorreo] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedCorreo = Cookies.get('correo');
//     if (savedCorreo) {
//       setCorreo(savedCorreo);
//     }
//   }, []);

//   const mensajeExito = () => {
//     toast.success('¡Código correcto!', {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'light',
//     });
//     setTimeout(() => navigate('/contras_3'), 3000);
//   };

//   const mensajeError = (msg = '¡Tienes que llenar todos los campos!') => {
//     toast.error(msg, {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'light',
//     });
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await api.post('/validar-codigo', {
//         token: code, 
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true, 
//       });

//       if (response.data.ok) {
//         mensajeExito();
//       } else {
//         mensajeError(response.data.message);
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error('Error de respuesta:', error.response.data);
//         mensajeError(error.response.data.message);
//       } else if (error.request) {
//         console.error('No se recibió respuesta del servidor:', error.request);
//         mensajeError('No se recibió respuesta del servidor');
//       } else {
//         console.error('Error al enviar la solicitud:', error.message);
//         mensajeError('Error al enviar la solicitud');
//       }
//     }
//   };

//   return (
//     <div className='pagina flex flex-col md:flex-row h-screen bg-fondo'>
//       <div className='w-full md:w-1/2 bg-negro flex justify-center items-center md:clip-path h-full'>
//         <div className='main w-3/4 md:w-1/2 text-center'>
//           <div className='letras font-inter mb-4 md:mb-10'>
//             <h3 className='text-white font-normal text-2xl md:text-4xl lg:text-4xl'>Confirme su dirección</h3>
//             <h3 className='text-white font-normal text-2xl md:text-4xl lg:text-4xl md:mt-2'>de correo electrónico</h3>
//           </div>
//           <div className='space-y-6 text-center mb-16 mt-8'>
//             <h1 className='text-white font-normal text-xl md:text-2xl lg:text-2xl mt-2 md:mt-4'>Código de verificación enviado a:</h1>
//             <h1 className='text-correo font-normal text-xl md:text-2xl lg:text-2xl mt-2 md:mt-4'>{correo}</h1>
//           </div>
//           <div className='mt-4 mb-10 px-2 w-full mx-auto'>
//             <input
//               className='input text-3xl text-white block p-4 w-full text-center  focus:outline-none'
//               maxLength='6'
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />
//           </div>
//           <button
//             className='btn-primary mt-6 mb-3'
//             onClick={handleLogin}
//           >
//             Confirmar correo
//           </button>
//         </div>
//       </div>
//       <div className='hidden md:flex items-center justify-center md:w-1/2 bg-fondo'>
//         <div className='w-3/4'>
//           <img className='w-80 h-80 object-cover' src={fondo} alt='logoSena' />
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Contras_2;

//CODIGO DE JOSE
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { api } from '../api/token';
import fondo from '/logoSena.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Contras_2 = () => {
  const [code, setCode] = useState(new Array(6).fill(''));
  const [correo, setCorreo] = useState('');
  const inputRefs = useRef([]);
  const [intentos, setIntentos] = useState(0);

  const navigate = useNavigate(); // Obtener navigate de react-router-dom

  useEffect(() => {
    const savedCorreo = Cookies.get('correo');
    if (savedCorreo) {
      setCorreo(savedCorreo);
    }
  }, []);

  const handleChange = (e, index) => {
    let { value } = e.target;
    // Eliminar caracteres no permitidos
    value = value.replace(/[^A-Za-z0-9]/g, '');
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (index < 5 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (code[index] === '' && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1].focus();
      }
    }
  };
  

  const mensajeExito = () => {
    toast.success('¡Código correcto!', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setTimeout(() => navigate('/contras_3'), 3000);
  };

  const mensajeError = (msg = '¡Tienes que llenar todos los campos!') => {
    // Incrementar el contador de intentos
    setIntentos(intentos + 1);

    if (intentos >= 2) { // Por ejemplo, cancelar después de 3 intentos fallidos
      toast.error('Se ha excedido el número de intentos. El código ha sido cancelado.');
      setCode(new Array(6).fill('')); // Vaciar campos solo si se excede el número de intentos
      setTimeout(() => navigate('/contras_1'), 3000); // Redirigir a la ruta de envío de correo después de 3 intentos fallidos
    } else {
      toast.error(msg, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setCode(new Array(6).fill('')); // Vaciar campos en caso de error de validación
    }
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/validar-codigo', {
        token: code.join(''), // Unir los caracteres del código en una cadena
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data.ok) {
        // Código correcto, proceder con éxito
        mensajeExito();
      } else {
        // Mostrar mensaje de error y manejar intentos
        mensajeError(response.data.message);
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al validar código:', error);
      mensajeError('Error al validar código');
    } finally {
      // Reiniciar los intentos si el código es correcto
      if (response && response.data.ok) {
        setIntentos(0);
      }
    }
  };
 
  return (
    <div className='pagina flex flex-col md:flex-row h-screen bg-fondo'>
      <div className='w-full md:w-1/2 bg-negro flex justify-center items-center md:clip-path h-full'>
        <div className='main w-3/4 md:w-1/2 text-center'>
          <div className='letras font-inter mb-4 md:mb-10'>
            <h3 className='text-white font-normal text-2xl md:text-4xl lg:text-4xl'>Confirme su dirección</h3>
            <h3 className='text-white font-normal text-2xl md:text-4xl lg:text-4xl md:mt-2'>de correo electrónico</h3>
          </div>
          <div className='space-y-6 text-center mb-16 mt-8'>
            <h1 className='text-white font-normal text-xl md:text-2xl lg:text-2xl mt-2 md:mt-4'>Código de verificación enviado a:</h1>
            <h1 className='text-correo font-normal text-xl md:text-2xl lg:text-2xl mt-2 md:mt-4'>{correo}</h1>
          </div>
          <div className='mt-4 mb-10 px-2 w-full mx-auto flex justify-center'>
            {code.map((char, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                className='input text-lg text-white block p-3 w-12 text-center mx-1 focus:outline-none'
                maxLength='1'
                value={char}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <div className='space-y-6 text-center mb-16 mt-8'>
            <h1 className='text-white font-normal text-sm md:text-xl lg:text-2xl mt-2 md:mt-4'>Intentos: {intentos}/3</h1>
          </div>
          <button
            className='btn-primary mt-6 mb-3'
            onClick={handleLogin}
          >
            Confirmar correo
          </button>
        </div>
      </div>
      <div className='hidden md:flex items-center justify-center md:w-1/2 bg-fondo'>
        <div className='w-3/4'>
          <img className='w-80 h-80 object-cover' src={fondo} alt='logoSena' />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contras_2;