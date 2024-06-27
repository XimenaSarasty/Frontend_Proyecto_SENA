import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalPerfil = ({ isOpen, onClose }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    Documento: '',
    correo: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchUserProfile();
    }
  }, [isOpen]);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        nombre: userInfo.nombre || '',
        Documento: userInfo.Documento || '',
        correo: userInfo.correo || '',
      });
    }
  }, [userInfo]);

  const fetchUserProfile = async () => {
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');

      const response = await axios.get('http://localhost:9100/perfil', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUserInfo(response.data.perfil);
        setError(null);
      } else {
        console.error('Error fetching user profile:', response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Error al cargar la información del usuario.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');

      const response = await axios.put(`http://localhost:9100/usuarios/${userInfo.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          ...formData,
        }));
        // alert('Usuario actualizado exitosamente');
        toast.success('Usuario actualizado exitosamente', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      } else {
        console.error('Error updating user profile:', response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError('Error al actualizar la información del usuario.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
      // Aquí se agrega la logica para subir la foto de perfil
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-fondo bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-lg sm:w-full md:w-2/3 mt-4 max-h-screen overflow-y-auto'>
        <div className='flex justify-end p-2'>
          <button onClick={onClose}>
            <FaTimes className='text-black w-4 h-4' />
          </button>
        </div>
        <div className='flex flex-col md:flex-row px-4 space-y-4 md:space-y-0 md:space-x-4'>
          <div className='bg-grisClaro h-72 w-full md:w-1/3 mb-4 rounded-lg flex items-center justify-center relative'>
            <FaUserCircle className='text-black w-32 h-32' />
            <input 
              type='file' 
              className='absolute inset-0 opacity-0 cursor-pointer'
              onChange={handleFileChange}
            />
          </div>
          
          <div className='w-full md:w-3/4'>
            {loading ? (
              <p>Cargando información...</p>
            ) : error ? (
              <p>{error}</p>
            ) : userInfo ? (
              <div className='font-inter ml-2'>
                <div className='space-y-2 md:space-y-2 text-left'>
                  <h6 className='font-bold text-3xl mb-4'>Detalles de la cuenta</h6>  

                  <div className='flex flex-col'>
                    <label className='mb-1 font-bold'>Nombre *</label>
                    <input 
                      className='bg-grisClaro rounded-lg' 
                      type='text' 
                      name="nombre"
                      value={formData.nombre} 
                      onChange={handleInputChange} 
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label className='mb-1 font-bold'>Documento *</label>
                    <input 
                      className='bg-grisClaro rounded-lg' 
                      type='text' 
                      name="Documento"
                      value={formData.Documento} 
                      onChange={handleInputChange} 
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label className='mb-1 font-bold'>Correo *</label>
                    <input 
                      className='bg-grisClaro rounded-lg' 
                      type='text' 
                      name="correo"
                      value={formData.correo} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>      
              </div>
            ) : (
              <p>Error al cargar la información del usuario.</p>
            )}
          </div>
          <div className='sm:w-full md:w-1/3 flex flex-col justify-end'>
            <button className='btn-primary mb-4' onClick={handleUpdate}>Actualizar</button>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPerfil;

