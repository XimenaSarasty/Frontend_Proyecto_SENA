import React, { useState } from 'react';
import { FaBars, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import ModalCsesion from './ModalCsesion';
import ModalPerfil from './ModalPerfil';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { api } from '../api/token';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPerfilOpen, setIsModalPerfilOpen] = useState(false);

  const handleLogout = () => {
    setShowConfirm(true);
    toast.warn(
      <div>
        <p>¿Seguro quieres cerrar la sesión?</p>
        <button onClick={confirmLogout} style={{ marginRight: '10px' }}>Sí</button>
        <button onClick={() => setShowConfirm(false)}>No</button>
      </div>,
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      }
    );
  };

  const confirmLogout = async () => {
    const Documento = 'Documento';
    const password = 'password';

    const body = { Documento, password };
    const response = await api.post('/logout', body);
    if (response.data) {
      signout();
      Cookies.remove('token');
      navigate('/');
      toast.dismiss();
    }
  };

  const handleOpenModalPerfil = () => {
    setIsModalPerfilOpen(true);
    setIsModalOpen(false);
  };

  return (
    <nav className={`bg-gray-200 shadow px-4 py-3 flex justify-between items-center fixed top-0 left-0 z-50 w-full transition-all duration-300`} 
    style={{ marginLeft: sidebarToggle ? '16rem' : '0', width: sidebarToggle ? 'calc(100% - 16rem)' : '100%' }}>
      <div className='flex items-center text-xl'>
        <FaBars className='text-black mr-4 cursor-pointer'
          onClick={() => setSidebarToggle(!sidebarToggle)} />
        <span className='text-black font-semibold hidden md:inline'>Bienvenido al inventario </span>
        <span className='text-sena font-semibold mt-6 hidden md:inline'>Mobiliario</span>
      </div>
      <div className='flex justify-end w-full max-w-full'>
        <div className='flex items-center gap-x-5'>
          <div className='relative items-center md:w-65'>
            <span className='relative md:absolute inside-y-0 left-0 flex items-center pl-40'>
              <button className='p-2 focus:outline-none text-white md:text-black'><FaSearch /></button>
            </span>
            <input type='text' 
              placeholder='Buscar aquí'
              className='w-full px-4 py-1 pl-22 rounded-lg shadow outline-none hidden md:block bg-gray-100'/>
          </div>
          <div className='text-white'>
            <FaBell className='w-6 h-6 text-black' />
          </div>
          <div>
            <button className='text-white group' onClick={() => setIsModalOpen(true)}>
              <FaUserCircle className='text-black w-6 h-6 mt-1' />
            </button>
          </div>
        </div>
      </div>
      <ModalCsesion isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>    
        <ul className='font-inter text-sm text-black font-bold'>
          <li>
            <div className='bg-gray-100 text-center rounded-lg my-2' onClick={handleOpenModalPerfil}> 
              <span className='cursor-pointer block w-full text-center'>
                Editar perfil
              </span>
            </div>
          </li>
          <li>
            <div className='bg-gray-100 text-center rounded-lg my-4'> 
              <a href=''>Ayuda</a>
            </div>
          </li>
          <li>
            <div className='bg-gray-100 text-center rounded-lg my-4'> 
              <a href=''>Configuración</a>
            </div>
          </li>
          <li>
            <div className='bg-gray-100 text-center rounded-lg my-4'> 
              <span onClick={handleLogout} className='cursor-pointer block w-full text-center'>
                Cerrar Sesión
              </span>
            </div>
          </li>
        </ul>
      </ModalCsesion>
      <ModalPerfil isOpen={isModalPerfilOpen} onClose={() => setIsModalPerfilOpen(false)} />
      <ToastContainer />
    </nav>
  );
};

export default Navbar;



//CODIGO POR SI LA EMBARRO
// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { toast, ToastContainer } from 'react-toastify';
// import { api } from '../api/token';
// import { FaBars, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
// import 'react-toastify/dist/ReactToastify.css';
// import ModalCsesion from './ModalCsesion';
// import ModalPerfil from './ModalPerfil';

// const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
//   const { signout } = useAuth();
//   const navigate = useNavigate();
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalPerfilOpen, setIsModalPerfilOpen] = useState(false);

//   const handleLogout = () => {
//     setShowConfirm(true);
//     toast.warn(
//       <div>
//         <p>¿Seguro quieres cerrar la sesión?</p>
//         <button onClick={confirmLogout} style={{ marginRight: '10px' }}>Sí</button>
//         <button onClick={() => setShowConfirm(false)}>No</button>
//       </div>,
//       {
//         position: 'top-center',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'light',
//       }
//     );
//   };

//   const confirmLogout = async () => {
//     const Documento = 'Documento';
//     const password = 'password';

//     const body = { Documento, password };
//     const response = await api.post('/logout', body);
//     if (response.data) {
//       signout();
//       Cookies.remove('token');
//       navigate('/');
//       toast.dismiss();
//     }
//   };

//   const handleOpenModalPerfil = () => {
//     setIsModalPerfilOpen(true);
//     setIsModalOpen(false);
//   };

//   return (
//     <nav className={`bg-fondo shadow px-4 py-3 flex justify-between items-center fixed top-0 left-0 z-50 w-full transition-all duration-300`} 
//     style={{ marginLeft: sidebarToggle ? '16rem' : '0', width: sidebarToggle ? 'calc(100% - 16rem)' : '100%' }}>
//       <div className='flex items-center text-xl'>
//         <FaBars className='text-black mr-4 cursor-pointer'
//           onClick={() => setSidebarToggle(!sidebarToggle)} />
//         <span className='text-black font-semibold hidden md:inline'>Bienvenido al inventario </span>
//         <span className='text-sena font-semibold mt-6 hidden md:inline'>Mobiliario</span>
//       </div>
//       <div className='flex justify-end w-full max-w-full'>
//         <div className='flex items-center gap-x-5'>
//           <div className='relative items-center md:w-65'>
//             <span className='relative md:absolute inside-y-0 left-0 flex items-center pl-40'>
//               <button className='p-2 focus:outline-none text-white md:text-black'><FaSearch /></button>
//             </span>
//             <input type='text' 
//               placeholder='Buscar aquí'
//               className='w-full px-4 py-1 pl-22 rounded-lg shadow outline-none hidden md:block bg-grisClaro'/>
//           </div>
//           <div className='text-white'>
//             <FaBell className='w-6 h-6 text-black' />
//           </div>
//           <div>
//             <button className='text-white group' onClick={() => setIsModalOpen(true)}>
//               <FaUserCircle className='text-black w-6 h-6 mt-1' />
//             </button>
//           </div>
//         </div>
//       </div>
//       <ModalCsesion isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>    
//         <ul className='font-inter text-sm text-black font-bold'>
//           <li>
//             <div className='bg-grisClaro text-center rounded-lg my-2' onClick={handleOpenModalPerfil}> 
//               <span className='cursor-pointer block w-full text-center'>
//                 Editar perfil
//               </span>
//             </div>
//           </li>
//           <li>
//             <div className='bg-grisClaro text-center rounded-lg my-4'> 
//               <a href=''>Ayuda</a>
//             </div>
//           </li>
//           <li>
//             <div className='bg-grisClaro text-center rounded-lg my-4'> 
//               <a href=''>Configuración</a>
//             </div>
//           </li>
//           <li>
//             <div className='bg-grisClaro text-center rounded-lg my-4'> 
//               <span onClick={handleLogout} className='cursor-pointer block w-full text-center'>
//                 Cerrar Sesión
//               </span>
//             </div>
//           </li>
//         </ul>
//       </ModalCsesion>
//       <ModalPerfil isOpen={isModalPerfilOpen} onClose={() => setIsModalPerfilOpen(false)} />
//       <ToastContainer />
//     </nav>
//   );
// };

// export default Navbar;
