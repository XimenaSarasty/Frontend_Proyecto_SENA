import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { api } from '../api/token';
import { FaBars, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ sidebarToggle, setSiderbarToggle }) => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setShowConfirm(true);
    toast.warn(
      <div>
        <p>¿Seguro quieres cerrar la sesión?</p>
        <button onClick={confirmLogout} style={{ marginRight: '10px' }}>Sí</button>
        <button onClick={() => setShowConfirm(false)}>No</button>
      </div>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  const confirmLogout = async () => {
    const Documento = 'Documento';
    const password = 'password';

    const body = { Documento, password };
    const response = await api.post("/logout", body);
    if (response.data) {
      signout();
      Cookies.remove('token');
      navigate('/');
      toast.dismiss();
    }
  };

  return (
    <nav className='bg-black px-4 py-3 flex justify-between items-center fixed w-full top-0 left-0 z-50'>
      <div className='flex items-center text-xl'>
        <FaBars className='text-white me-4 cursor-pointer'
          onClick={() => setSiderbarToggle(!sidebarToggle)} />
        <span className='text-white font-semibold hidden md:inline'>Bienvenido al inventario </span>
        <h1> </h1>
        <h1 className='text-sena font-semibold hidden md:inline'>Mobiliario</h1>
      </div>
      <div className='flex items-center gap-x-5'>
        <div className='relative md:w-65'>
          <span className='relative md:absolute inside-y-0 left-0 flex items-center pl-2'>
            <button className='p-1 focus:outline-none text-white md:text-black'><FaSearch /></button>
          </span>
          <input type='text' className='w-full px-4 py-1 pl-22 rounded shadow outline-none hidden md:block' />
        </div>
        <div className='text-white'>
          <FaBell className='w-6 h-6' />
        </div>
        <div className='relative'>
          <button className='text-while group'>
            <FaUserCircle className='text-white w-6 h-6 mt-1' />
            <div className='z-10 hidden absolute rounded-lg shadow w-32 group-focus:block top-full right-0'>
              <ul className='py-2 text-sm text-gray-950'>
                <li><a href=''>Editar perfil</a></li>
                <li><a href=''>Ayuda</a></li>
                <li><a href=''>Configuración</a></li>
                <li><span onClick={handleLogout} className="cursor-pointer block w-full text-left">
                  Cerrar Sesión</span></li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    <ToastContainer />
    </nav>
  );
};

export default Navbar;


//CODIGO SIN RESPONSIVE
// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { toast, ToastContainer } from 'react-toastify';
// import { api } from '../api/token';
// import {FaBars, FaSearch, FaBell, FaUserCircle} from 'react-icons/fa'
// import 'react-toastify/dist/ReactToastify.css';

// const Navbar = ({sidebarToggle, setSiderbarToggle}) => {
//     const { signout } = useAuth();
//     const navigate = useNavigate();
//     const [showConfirm, setShowConfirm] = useState(false);

//     const handleLogout = () => {
//         setShowConfirm(true);
//         toast.warn(
//             <div>
//                 <p>¿Seguro quieres cerrar la sesión?</p>
//                 <button onClick={confirmLogout} style={{ marginRight: '10px' }}>Sí</button>
//                 <button onClick={() => setShowConfirm(false)}>No</button>
//             </div>,
//             {
//                 position: "top-center",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             }
//         );
//     };

//     const confirmLogout = async () => {
      
//         const Documento = 'Documento'; 
//         const password = 'password';
        
//         const body = { Documento, password };
//         const response = await api.post("/logout", body);
//         if (response.data) {
//             signout();
//             Cookies.remove('token');
//             navigate('/');
//             toast.dismiss(); 
//         }
//     };

//     return (
//         <nav className='bg-black px-4 py-3 flex justify-between'>
//             <div className='flex items-center text-m md:text-xl'>
//                 <FaBars className='text-white me-4 cursor-pointer'
//                     onClick={() => setSiderbarToggle(!sidebarToggle)}/>
//                 <span className='text-white font-semibold'>Bienvenido al inventario</span>
//                 <span className='text-sena font-semibold'>Mobiliario</span>
//             </div>
//             <div className='flex items-center gap-x-5'>
//                 <div className='relative md:w-65'>
//                     <span className='relative md:absolute inside-y-0 left-0 flex items-center pl-2'>
//                         <button className='p-1 focus:outline-none text-white md:text-black'><FaSearch /></button>
//                     </span>
//                     <input type='text' className='w-full px-4 py-1 pl-22 rounded shadow outline-none hidden md:block'/>
//                 </div>
//                 <div className='text-white'>
//                     <FaBell className='w-6 h-6'/>
//                 </div>
//                 <div className='relative'>
//                     <button className='text-while group'>
//                         <FaUserCircle className='text-white w-6 h-6 mt-1'/>
//                         <div className='z-10 hidden absolute rounded-lg shadow w-32 group-gocus:block top-full right-0'>
//                             <ul className='py-2 text-sm text-gray-950'>
//                                 <li><a href=''>Editar perfil</a></li>
//                                 <li><a href=''>Ayuda</a></li>
//                                 <li><a href=''>Configuración</a></li>
//                                 <li><a href=''>Cerrar sesión</a></li>
//                             </ul>
//                         </div>
//                     </button>
//                 </div>
//             </div>
//             {/* <button className='btn-primary' onClick={handleLogout}>
//                 Cerrar Sesión
//             </button>
//             <ToastContainer /> */}
//         </nav>
//     );
// };

// export default Navbar;


