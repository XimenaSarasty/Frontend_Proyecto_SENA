import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import fondo from '/logoSena.png';
import { api } from '../api/token';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { usuarioSchemas } from '../../../Backend_Sena/src/schemas/Usuario.schemas';

const Login = () => {
  const [Documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!Documento) {
      toast.error("El documento es requerido", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

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
    }

    if (Documento && password) {

      localStorage.setItem("Documento", Documento);

      try {
        const body = { Documento, password };
        const response = await api.post("/login", body);
        if (response.data) {
          const { token } = response.data;
          localStorage.setItem("token", token);
          Cookies.set("token", token);

          await signin({ Documento, password });
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
      } catch (error) {
        toast.error("Credenciales inválidas", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const handleDocumentoChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setDocumento(value);
    }
  };

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

  return (
    <div className="pagina flex flex-col md:flex-row h-screen bg-fondo">
      <div className="w-full md:w-1/2 bg-negro flex justify-center items-center md:clip-path h-full md:h-auto">
        <div className="main w-3/4 md:w-1/2 text-center text-lg">
          <div className="letras font-inter mb-4 md:mb-8">
            <h1 className="text-white font-normal text-2xl md:text-4xl lg:text-5xl mt-2 md:mt-4">Bienvenido a</h1>
            <h1 className="text-white font-semibold text-2xl md:text-4xl lg:text-5xl mt-2 md:mt-4">inventario del</h1>
            <h1 className="text-sena font-semibold text-2xl md:text-4xl lg:text-5xl mt-2 md:mt-4">Mobiliario</h1>
          </div>
          <div className="space-y-4 md:space-y-6 text-left">
            <div className="input w-full mb-2 relative">
              <label className="text-sm text-white block mb-1">Identificación</label>
              <div className="flex items-center border-b-2 border-white">
                <input
                  type="text"
                  className="text flex-1 p-2 bg-transparent text-white focus:outline-none pr-10"
                  value={Documento}
                  onChange={handleDocumentoChange}
                />
                <FontAwesomeIcon icon={faUser} className="absolute right-2 text-white ml-2" />
              </div>
            </div>
            <div className="input w-full mb-2 relative">
              <label className="text-sm text-white block mb-1">Contraseña</label>
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
          <button className="btn-primary mt-2 md:mt-8" onClick={handleLogin}>Iniciar sesión</button>
          <div className="mt-2">
            <NavLink to={'/contras_1'} className="text-white text-sm md:text-lg mt-4">Olvidé mi contraseña</NavLink>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center md:w-1/2 bg-fondo">
        <div className="w-3/4">
          <img className="w-80 h-80 object-cover" src={fondo} alt="logoSena" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
  
};

export default Login;

//CODIGO CON EL ROL REALIZADO:
// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
// import { ToastContainer, toast } from 'react-toastify';
// import { useAuth } from '../context/AuthContext';
// import fondo from '/logoSena.png';
// import { api } from '../api/token';
// import Cookies from 'js-cookie';
// import 'react-toastify/dist/ReactToastify.css';
// import { usuarioSchemas } from '../../../Backend_Sena/src/schemas/Usuario.schemas';

// const Login = () => {
//   const [Documento, setDocumento] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const { signin } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!Documento) {
//       toast.error("El documento es requerido", {
//         position: "top-right",
//         autoClose: 2500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }

//     if (!password) {
//       toast.error("La contraseña es requerida", {
//         position: "top-right",
//         autoClose: 2500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }

//     if (Documento && password) {

//       localStorage.setItem("Documento", Documento);

//       try {
//         const body = { Documento, password };
//         const response = await api.post("/login", body);
//         if (response.data) {
//           const { token } = response.data;
//           localStorage.setItem("token", token);
//           Cookies.set("token", token);

//           await signin({ Documento, password });
//           toast.success("Inicio de sesión exitoso.", {
//             position: "top-right",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//           setTimeout(() => {
//             navigate("/home");
//           }, 2000);
//         }
//       } catch (error) {
//         toast.error("Credenciales inválidas", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       }
//     }
//   };

//   const handleDocumentoChange = (e) => {
//     const value = e.target.value;
//     if (/^[0-9]*$/.test(value) && value.length <= 10) {
//       setDocumento(value);
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;

//     if (value.length <= 20) {
//       setPassword(value);

//       const passwordValidation = usuarioSchemas.pick({ password: true });
//       const validationResult = passwordValidation.safeParse({
//         password: value,
//       });

//       if (!validationResult.success) {
//         const firstError = validationResult.error.errors[0].message;
//         setPasswordError(firstError);
//       } else {
//         setPasswordError(""); 
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-fondo">
//       <div className="w-full md:w-1/2 bg-negro flex justify-center items-center md:clip-path md:clip-polygon h-full md:h-auto">
//         <div className="w-1/2 text-center text-lg">
//           <div className="font-inter mb-20">
//             <h1 className="text-white font-normal text-4xl md:text-5xl mt-4">Bienvenido a</h1>
//             <h1 className="text-white font-semibold text-4xl md:text-5xl mt-4">inventario del</h1>
//             <h1 className="text-sena font-semibold text-4xl md:text-5xl mt-4">Mobiliario</h1>
//           </div>
//           <div className="space-y-6 text-left">
//             <div className="input w-full mb-4">
//               <label className="text-sm text-white block mb-1">Identificación</label>
//               <div className="flex items-center border-b-2 border-white">
//                 <input
//                   type="text"
//                   className="flex-1 p-2 bg-transparent text-white focus:outline-none"
//                   value={Documento}
//                   onChange={handleDocumentoChange}
//                 />
//                 <FontAwesomeIcon icon={faUser} className="text-white ml-2" />
//               </div>
//             </div>
//             <div className="input w-full mb-4">
//               <label className="text-sm text-white block mb-1">Contraseña</label>
//               <div className="flex items-center border-b-2 border-white">
//                 <input
//                   type="password"
//                   className="flex-1 p-2 bg-transparent text-white focus:outline-none"
//                   value={password}
//                   onChange={handlePasswordChange}               
//                 />
//                 <FontAwesomeIcon icon={faKey} className="text-white ml-2" />
//               </div>
//               {passwordError && (
//                 <div className="text-red-400 text-sm mt-1">{passwordError}</div>
//               )}
//             </div>
//             {/* <div className="input w-full mb-4">
//               <label className="text-sm text-white block mb-1">Rol</label>
//               <div className="flex items-start border-b-2 border-white">
//                 <select
//                   className="flex-1 h-8 p-2 bg-input text-white text-sm focus:outline-none appearance-none"
//                   value={rol}
//                   onChange={(e) => setRol(e.target.value)}
//                 >
//                   <option value="">Seleccione su rol</option>
//                   <option value="admin">Admin</option>
//                   <option value="user">User</option>
//                 </select>
//                 <FontAwesomeIcon icon={faCaretDown} className="text-white ml-2" />
//               </div>
//             </div> */}
//           </div>
//           <button className="btn-primary mt-20" onClick={handleLogin}>Iniciar sesión</button>
//           <div className='mt-2'>
//             <NavLink to={'/contras_1'} className="text-white text-lg mt-8">Olvide mi contraseña</NavLink>
//           </div>          
//         </div>
//       </div>
//       <div className="hidden md:flex items-center justify-center md:w-1/2 bg-fondo">
//         <div className='w-1/2'>
//           <img className="w-2/3 h-auto object-cover" src={fondo} alt="logoSena" />
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;

