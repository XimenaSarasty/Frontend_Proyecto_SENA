import React from 'react';
import { FaHome } from 'react-icons/fa';
import { LiaToolsSolid } from 'react-icons/lia';
import { FaUserLarge } from 'react-icons/fa6';
import { FaFileExcel } from 'react-icons/fa';
import { IoBarChartSharp } from 'react-icons/io5';
import { FaUsers } from "react-icons/fa";
import { PiChalkboardTeacher } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";

import fondo from '/logoSena.png';

const Sidebar = ({ sidebarToggle }) => {
  return (
    <div className={`fixed w-64 bg-black h-full px-4 py-2 transition-all duration-300 ${sidebarToggle ? 'block' : 'hidden'}`}>
      <div className='relative flex items-center font-inter my-2 mb-4'>
        <img className='w-10 h-10 object-cover' src={fondo} alt='logoSena' />
        <div className='absolute top-0 left-14 z-10 font-inter text-lg custom-text'>
          <h6 className='textMob text-white font-bold'>Inventario del</h6>
          <h6 className='text-sena font-bold'>Mobiliario</h6>
        </div>
      </div>
      <hr />
      <ul className='mt-3 text-white font-bold font-inter'>
        <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
          <a href='/home' className='px-3'>
            <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>
            Dashboard
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
          <a href='/home' className='px-3'>
            <LiaToolsSolid className='inline-block w-6 h-6 mr-2 -mt-2'></LiaToolsSolid>
            Productos
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
          <a href='/Usuarios' className='px-3'>
            <FaUserLarge className='inline-block w-6 h-6 mr-2 -mt-2'></FaUserLarge>
            Usuarios
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
          <a href='/roles' className='px-3'>
            <FaUsers className='inline-block w-6 h-6 mr-2 -mt-2'></FaUsers>
            Roles
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
          <a href='/categorias' className='px-3'>
            <TbCategory className='inline-block w-6 h-6 mr-2 -mt-2'></TbCategory>
            Categorias
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
          <a href='/instructores' className='px-3'>
            <PiChalkboardTeacher  className='inline-block w-6 h-6 mr-2 -mt-2'></PiChalkboardTeacher>
            Instructores
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
          <a href='/home' className='px-3'>
            <FaFileExcel className='inline-block w-6 h-6 mr-2 -mt-2'></FaFileExcel>
            Importar excel
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
          <a href='/home' className='px-3'>
            <IoBarChartSharp className='inline-block w-6 h-6 mr-2 -mt-2'></IoBarChartSharp>
            Charts
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

//CODIGO POR SI LA EMBARRO
// import React from 'react';
// import { FaHome } from 'react-icons/fa';
// import { LiaToolsSolid } from 'react-icons/lia';
// import { FaUserLarge } from 'react-icons/fa6';
// import { FaFileExcel } from 'react-icons/fa';
// import { IoBarChartSharp } from 'react-icons/io5';
// import fondo from '/logoSena.png';

// const Sidebar = ({ sidebarToggle }) => {
//   return (
//     <div className={`fixed w-64 bg-black h-full px-4 py-2 transition-all duration-300 ${sidebarToggle ? 'block' : 'hidden'}`}>
//       <div className='relative flex items-center font-inter my-2 mb-4'>
//         <img className='w-10 h-10 object-cover' src={fondo} alt='logoSena' />
//         <div className='absolute top-0 left-14 z-10 font-inter text-lg custom-text'>
//           <h6 className='textMob text-white font-bold'>Inventario del</h6>
//           <h6 className='text-sena font-bold'>Mobiliario</h6>
//         </div>
//       </div>
//       <hr />
//       <ul className='mt-3 text-white font-bold font-inter'>
//         <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
//           <a href='/home' className='px-3'>
//             <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>
//             Dashboard
//           </a>
//         </li>
//         <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
//           <a href='/home' className='px-3'>
//             <LiaToolsSolid className='inline-block w-6 h-6 mr-2 -mt-2'></LiaToolsSolid>
//             Productos
//           </a>
//         </li>
//         <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
//           <a href='/Usuarios' className='px-3'>
//             <FaUserLarge className='inline-block w-6 h-6 mr-2 -mt-2'></FaUserLarge>
//             Usuarios
//           </a>
//         </li>
//         <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
//           <a href='/home' className='px-3'>
//             <FaFileExcel className='inline-block w-6 h-6 mr-2 -mt-2'></FaFileExcel>
//             Importar excel
//           </a>
//         </li>
//         <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
//           <a href='/home' className='px-3'>
//             <IoBarChartSharp className='inline-block w-6 h-6 mr-2 -mt-2'></IoBarChartSharp>
//             Charts
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
