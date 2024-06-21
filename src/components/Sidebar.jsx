import React from 'react';
import { FaHome } from 'react-icons/fa';
import { LiaToolsSolid } from 'react-icons/lia';
import { FaUserLarge } from 'react-icons/fa6';
import { FaFileExcel } from 'react-icons/fa';
import { IoBarChartSharp } from 'react-icons/io5';
import fondo from '/logoSena.png';

const Sidebar = ({ sidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? 'hidden' : 'block'} fixed w-64 bg-black h-full px-4 py-2`}>
      <div className='relative flex items-center font-inter my-2 mb-4'>
        <img className="w-10 h-10 object-cover" src={fondo} alt="logoSena" />
        <div className='absolute top-0 left-14 z-10'>
          <h1 className='text-white font-bold'>Inventario del</h1>
          <h1 className='text-sena font-bold'>Mobiliario</h1>
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
          <a href='/home' className='px-3'>
            <FaUserLarge className='inline-block w-6 h-6 mr-2 -mt-2'></FaUserLarge>
            Usuarios
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


//CODIGO SIN RESPONSIVE
// import React from 'react'
// import {FaHome} from 'react-icons/fa'
// import { LiaToolsSolid } from "react-icons/lia";
// import { FaUserLarge } from "react-icons/fa6";
// import { FaFileExcel } from "react-icons/fa";
// import { IoBarChartSharp } from "react-icons/io5";
// import fondo from '/logoSena.png';

// const Sidebar = ({sidebarToggle}) => {
//   return (
//     <div className={`${sidebarToggle? 'hidden' : 'block '}fixed w-64 bg-black fixell h-full px-4 py-2`}>
//         <div className='relative flex items-center font-inter my-2 mb-4'>
//             <img className="w-10 h-10 object-cover" src={fondo} alt="logoSena" />
//             <div className='absolute top-0 left-14 z-10'>
//                 <h1 className='text-white font-bold'>Inventario del</h1> 
//                 <h1 className='text-sena font-bold'>Mobiliario</h1> 
//             </div>
//         </div>
//         <hr/>
//         <ul className='mt-3 text-white font-bold font-inter'>
//             <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
//                 <a href='/home' className='px-3'>
//                     <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>
//                     Dashboard
//                 </a>
//             </li>
//             <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
//                 <a href='/home' className='px-3'>
//                     <LiaToolsSolid className='inline-block w-6 h-6 mr-2 -mt-2'></LiaToolsSolid>
//                     Productos
//                 </a>
//             </li>
//             <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
//                 <a href='/home' className='px-3'>
//                     <FaUserLarge className='inline-block w-6 h-6 mr-2 -mt-2'></FaUserLarge>
//                     Usuarios
//                 </a>
//             </li>
//             <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
//                 <a href='/home' className='px-3'>
//                     <FaFileExcel className='inline-block w-6 h-6 mr-2 -mt-2'></FaFileExcel>
//                     Importar excel
//                 </a>
//             </li>
//             <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
//                 <a href='/home' className='px-3'>
//                     <IoBarChartSharp className='inline-block w-6 h-6 mr-2 -mt-2'></IoBarChartSharp>
//                     Charts
//                 </a>
//             </li>
//         </ul>
//     </div>
//   )
// }

// export default Sidebar
