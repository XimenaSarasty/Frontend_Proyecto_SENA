// import { useNavigate } from 'react-router-dom';
import React from 'react';
import fondo from '/logoSena.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between bg-fondo h-screen">
      <div className="w-full h-screen bg-negro z-10 flex justify-center items-center md:w-1/2 md:clip-path md:clip-polygon">
        <div className="w-2/3 text-center text-lg">
          <div className="font-inter mb-20">
            <h1 className="text-white font-normal text-4xl md:text-5xl mt-4">Bienvenido a</h1>
            <h1 className="text-white font-semibold text-4xl md:text-5xl mt-4">inventario del</h1>
            <h1 className="text-sena font-semibold text-4xl md:text-5xl mt-4">Mobiliario</h1>
          </div>

          <div className='flex flex-col md:flex-row justify-center'>
            <div className="space-y-6 text-left">
              <div className="input w-full mb-4">
                <label className="text-sm text-white block mb-1">Identificación</label>
                <div className="flex items-start border-b-2 border-white">
                  <input type="text" className="flex-1 h-8 p-2 bg-transparent text-white focus:outline-none" />
                  <FontAwesomeIcon icon={faUser} className="text-white ml-2" />
                </div>
              </div>
              <div className="input w-full mb-4">
                <label className="text-sm text-white block mb-1">Contraseña</label>
                <div className="flex items-start border-b-2 border-white">
                  <input type="password" className="flex-1 h-8 p-2 bg-transparent text-white focus:outline-none" />
                  <FontAwesomeIcon icon={faKey} className="text-white ml-2" />
                </div>
              </div>
              <div className="input w-full mb-4">
                <label className="text-sm text-white block mb-1">Rol</label>
                <div className="flex items-start border-b-2 border-white">
                  <select className="flex-1 h-8 p-2 bg-input text-white text-sm focus:outline-none appearance-none">
                    <option value="">Seleccione su rol</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  
                    </select>
                    <FontAwesomeIcon icon={faCaretDown} className="text-white ml-2" />
                  </div>
                </div>
              </div>
            </div>
          <button className='btn-primary mt-20'>Iniciar sesión</button>
            <p className='text-white text-lg mt-8'>Olvide mi contraseña</p>
        </div>
      </div>
      <div className="hidden md:flex items-center h-screen w-1/2 sm:justify-center md:justify-end">
        <img className="w-1/2 h-auto object-cover mr-custom" src={fondo} alt="logoSena.png" />
      </div>
    </div>
  );
};

export default Login;





// CODIGO POR SI LA EMBARRO
// import React from 'react'
// import fondo from '/logoSena.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faKey, faCaretDown } from '@fortawesome/free-solid-svg-icons';

// const Login = () => {
//   return (
//     <div className="flex justify-between bg-fondo h-screen">
//       <div className="w-1/2 h-screen bg-negro z-10" style={{ clipPath: 'polygon(0 0, 80% 0, 100% 29%, 90% 100%, 0 100%)' }}>
//         <div className="text-center font-inter mt-20">
//           <h1 className="text-white font-normal text-6xl">Bienvenido a</h1>
//           <h1 className="text-white font-semibold text-6xl mt-4">inventario del</h1>
//           <h1 className="text-sena font-semibold text-6xl mt-4">Mobiliario</h1>
//         </div>
        
//         <div className="w-1/2 justify-center space-y-6 mt-20">
//           <div className="input w-full mb-4">
//             <label className="text-sm text-white block mb-1">Identificación</label>
//             <div className="flex items-center border-b-2 border-white">
//               <input type="text" className="flex-1 p-3 bg-transparent text-white focus:outline-none" />
//               <FontAwesomeIcon icon={faUser} className="text-white ml-2" />
//             </div>
//           </div>
//           <div className="input w-full mb-4">
//             <label className="text-sm text-white block mb-1">Contraseña</label>
//             <div className="flex items-center border-b-2 border-white">
//               <input type="password" className="flex-1 p-3 bg-transparent text-white focus:outline-none" />
//               <FontAwesomeIcon icon={faKey} className="text-white ml-2" />
//             </div>
//           </div>
//           <div className="input w-full mb-4">
//             <label className="text-sm text-white block mb-1">Rol</label>
//             <div className="flex items-center border-b-2 border-white">
//               <select className="flex-1 p-3 bg-transparent text-white focus:outline-none appearance-none">
//                 <option value="">Seleccione su rol</option>
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//               </select>
//               <FontAwesomeIcon icon={faCaretDown} className="text-white ml-2" />
//             </div>
//           </div>
//           <button className='btn-primary'>Iniciar sesión</button>
//           <p className='text-white'>Olvidé mi contraseña</p>
//         </div>
//       </div>
//       <div className="flex items-center h-screen w-1/2 sm:justify-center md:justify-end">
//         <img className="w-1/2 h-auto object-cover mr-custom" src={fondo} alt="logoSena.png" />
//       </div>
//     </div>
//   );
// };

// export default Login;