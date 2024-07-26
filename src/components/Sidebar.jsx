import React from "react";
import { FaHome, FaUsers, FaRegFileExcel, FaUnity } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { IoBarChartSharp } from "react-icons/io5";
import { PiChalkboardTeacher } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LiaDropbox } from "react-icons/lia";
import fondo from "/logoSena.png";

const Sidebar = ({ sidebarToggle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: sidebarToggle ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed w-64 bg-black h-full px-4 py-2 shadow-lg"
    >
      <div
        className="relative flex items-center font-inter my-2 mb-4"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <img className="w-10 h-10 object-cover" src={fondo} alt="logoSena" />
        <div className="absolute top-0 left-14 z-10 font-inter text-lg custom-text">
          <h6 className="textMob text-white font-bold">Inventario del</h6>
          <h6 className="text-sena font-bold">Mobiliario</h6>
        </div>
      </div>
      <hr />
      <ul className="mt-3 text-white font-bold font-inter">
        <li className="mb-2 rounded hover:shadow hover:bg-gray-200 py-2">
          <a href="/home" className="px-3">
            <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"></FaHome>
            Dashboard
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-200 py-2">
          <a href="/Usuarios" className="px-3">
            <FaUserLarge className="inline-block w-6 h-6 mr-2 -mt-2"></FaUserLarge>
            Usuarios
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-200 py-2">
          <a href="/roles" className="px-3">
            <FaUsers className="inline-block w-6 h-6 mr-2 -mt-2"></FaUsers>
            Roles
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-200 py-2">
          <a href="/instructores" className="px-3">
            <PiChalkboardTeacher className="inline-block w-6 h-6 mr-2 -mt-2"></PiChalkboardTeacher>
            Instructores
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-200 py-2">
          <a href="/fichas" className="px-3">
            <SiGoogleclassroom className="inline-block w-6 h-6 mr-2 -mt-2"></SiGoogleclassroom>
            Fichas
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-200 py-2">
          <a href="/categorias" className="px-3">
            <TbCategory className="inline-block w-6 h-6 mr-2 -mt-2"></TbCategory>
            Categorias
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-200 py-2">
          <a href="/subcategorias" className="px-3">
            <MdOutlineCategory className="inline-block w-6 h-6 mr-2 -mt-2"></MdOutlineCategory>
            Subcategorias
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
          <a href='/productos' className='px-3'>
            <LiaDropbox className='inline-block w-6 h-6 mr-2 -mt-2'></LiaDropbox>
            Productos
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-200 py-2">
          <a href="/excel" className="px-3">
            <FaRegFileExcel className="inline-block w-6 h-6 mr-2 -mt-2"></FaRegFileExcel>
            Importar Excel
          </a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-200 py-2">
          <a href="/unidadmedida" className="px-3">
            <FaUnity className="inline-block w-6 h-6 mr-2 -mt-2"></FaUnity>
            Unidad de Medida
          </a>
        </li>

        {/* 
        <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-2'>
          <a href='/home' className='px-3'>
            <IoBarChartSharp className='inline-block w-6 h-6 mr-2 -mt-2'></IoBarChartSharp>
            Charts
          </a>
        </li> */}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
