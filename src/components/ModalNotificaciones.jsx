import React from 'react'
import { FaTimes } from 'react-icons/fa';

const ModalNotificaciones = ({ isOpen, onClose, notifications }) => {
    if (!isOpen) return null;
  
    return (
      <div className='fixed inset-0 z-10 flex items-start justify-end bg-fondo bg-opacity-50'>
        <div className='bg-white rounded-lg shadow-lg w-72 mt-4 mr-4 max-h-screen overflow-y-auto'>
          <div className='flex justify-end p-2'>
            <button onClick={onClose}>
                <FaTimes className='text-black w-4 h-4' />
            </button>
          </div>
        <div>
            <h2 className="font-inter font-bold">Notificaciones</h2>
            <ul className="bg-gray-100 text-center rounded-lg my-2">
            {notifications.map((notification, index) => (
                <li key={index} className="mb-2">{notification}</li>
            ))}
            </ul>
        </div>
        </div>
      </div>
    );
  };

export default ModalNotificaciones;
