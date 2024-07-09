import React, { useState } from 'react';
import axios from 'axios';
import fondo from '/logoSena.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Contras_2 = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

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
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:9100/validar-codigo', {
        token: code, 
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, 
      });

      if (response.data.ok) {
        mensajeExito();
      } else {
        mensajeError(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error de respuesta:', error.response.data);
        mensajeError(error.response.data.message);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
        mensajeError('No se recibió respuesta del servidor');
      } else {
        console.error('Error al enviar la solicitud:', error.message);
        mensajeError('Error al enviar la solicitud');
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
            <h1 className='text-correo font-normal text-xl md:text-2xl lg:text-2xl mt-2 md:mt-4'>correo@correo.com</h1>
          </div>
          <div className='mt-4 mb-10 px-2 w-full mx-auto'>
            <input
              className='input text-3xl text-white block p-4 w-full text-center  focus:outline-none'
              maxLength='6'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
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

//CODIGO SIN RESPONSIVE
// import React, { useState } from 'react';
// import axios from 'axios';
// import fondo from '/logoSena.png';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const Contras_2 = () => {
//   const [code, setCode] = useState('');
//   const navigate = useNavigate();

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
//       const response = await axios.post('http://localhost:9100/validar-codigo', {
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
//           <div className='letras font-inter mb-4 md:mb-8'>
//             <h1 className='text-white font-normal text-2xl md:text-4xl lg:text-4xl'>Confirme su dirección</h1>
//             <h1 className='text-white font-normal text-2xl md:text-4xl lg:text-4xl md:mt-2'>de correo electrónico</h1>
//           </div>
//           <div className='space-y-6 text-center mb-20'>
//             <h1 className='text-white font-normal text-xl md:text-2xl lg:text-2xl mt-2 md:mt-4'>Código de verificación enviado a:</h1>
//             <h1 className='text-correo font-normal text-xl md:text-2xl lg:text-2xl mt-2 md:mt-4'>correo@correo.com</h1>
//           </div>
//           <div className='mt-4 mb-10 px-2 w-full mx-auto'>
//             <input
//               className='input text-3xl text-white block bg-gray-800 p-4 w-full text-center  focus:outline-none'
//               maxLength='6'
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />
//           </div>
//           <button
//             className={`btn-primary mt-18 mb-3 ${code.length !== 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
//             onClick={handleLogin}
//             disabled={code.length !== 6}
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