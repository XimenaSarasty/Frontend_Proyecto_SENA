import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes, FaUserCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalPerfil = ({ isOpen, onClose }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    Documento: '',
    correo: '',
    rolName: ''
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
        rolName: ''
      });
      fetchUserRole(userInfo.RolId);
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
        setFormErrors({});
      } else {
        console.error('Error fetching user profile:', response.data.message);
        setFormErrors({ fetch: response.data.message });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setFormErrors({ fetch: 'Error al cargar la información del usuario.' });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRole = async (roleId) => {
    try {
      const response = await axios.get(`http://localhost:9100/roles/${roleId}`);
      if (response.status === 200) {
        setFormData((prevData) => ({
          ...prevData,
          rolName: response.data.rolName || ''
        }));
      } else {
        console.error('Error fetching role:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching role:', error);
    }
  };

  const validateInput = (name, value) => {
    var errorMessage = '';
    if (name === 'nombre') {
      const nameRegex = /^[A-Za-z\s-_\u00C0-\u017F]+$/;
      if (!nameRegex.test(value) || /\d/.test(value)) {
        errorMessage = 'El nombre no puede contener caracteres especiales.';
      }
    } else if (name === 'Documento') {
      const documentRegex = /^\d+$/;
      if (!documentRegex.test(value) || /^[A-Za-z]+$/.test(value)) {
        errorMessage = 'El documento debe ser numérico.';
      }
    } else if (name === 'correo') {
      const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.includes('sena') || !correoRegex.test(value)) {
        errorMessage = 'El correo debe ser un correo válido institucional.';
      }
    }
    return errorMessage;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateInput(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const { nombre, Documento, correo } = formData;
    const nombreError = validateInput('nombre', nombre);
    const documentoError = validateInput('Documento', Documento);
    const correoError = validateInput('correo', correo);

    if (nombreError || documentoError || correoError) {
      setFormErrors({
        nombre: nombreError,
        Documento: documentoError,
        correo: correoError,
      });
      toast.error('Por favor, corrige los errores antes de actualizar.', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!nombre || !Documento || !correo) {
      toast.error('Todos los campos son obligatorios.', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');

      const response = await axios.put(`http://localhost:9100/usuarios/${userInfo.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        if (formData.Documento !== userInfo.Documento) {
          toast.success('Usuario actualizado exitosamente', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => {
              document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
              window.location.href = '/';
            },
          });
        } else {
          setUserInfo((prevInfo) => ({
            ...prevInfo,
            ...formData,
          }));
          toast.success('Usuario actualizado exitosamente', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        console.error('Error updating user profile:', response.data.message);
        setFormErrors({ update: response.data.message });
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      setFormErrors({ update: 'Error al actualizar la información del usuario.' });
      toast.error('Error al actualizar la información del usuario.', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
        <div className='flex flex-col md:flex-row px-4 space-y-4 md:space-y-0 md:space-x-4 mb-4'>
          <div className='contG bg-grisClaro sm:h-64 md:h-72 w-full md:w-1/3 mb-4 rounded-lg flex items-center justify-center relative'>
            <FaUserCircle className='text-black w-32 h-32' />
          </div>

          <div className='w-full md:w-3/4'>
            {loading ? (
              <p>Cargando información...</p>
            ) : formErrors.fetch ? (
              <p className='text-red-500'>{formErrors.fetch}</p>
            ) : userInfo ? (
              <div className='font-inter ml-2'>
                <div className='space-y-2 md:space-y-2 text-left'>
                  <h6 className='font-bold text-center text-2xl mb-2'>Detalles de la cuenta</h6>

                  <div className='flex flex-col'>
                    <label className='mb-1 font-bold text-sm'>Nombre *</label>
                    <input
                      className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                      type='text'
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      onKeyPress={(e) => {
                        if (/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      />
                    {formErrors.nombre && <div className='text-red-400 text-sm mt-1 px-2'>{formErrors.nombre}</div>}
                  </div>

                  <div className='flex flex-col'>
                    <label className='mb-1 font-bold text-sm'>Documento *</label>
                    <input
                      className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                      type='text'
                      name="Documento"
                      value={formData.Documento}
                      onChange={handleInputChange}
                      onKeyPress={(e) => {
                        if (/[A-Za-z]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      maxLength={10}
                    />
                    {formErrors.Documento && <div className='text-red-400 text-sm mt-1'>{formErrors.Documento}</div>}
                  </div>

                  <div className='flex flex-col'>
                    <label className='mb-1 font-bold text-sm'>Correo *</label>
                    <input
                      className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                      type='text'
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                    />
                    {formErrors.correo && <div className='text-red-400 text-sm mt-1'>{formErrors.correo}</div>}
                  </div>

                  <div className='flex flex-col'>
                    <label className='mb-1 font-bold text-sm'>Rol</label>
                    <input
                      className='bg-grisClaro text-sm text-gris rounded-lg px-2 h-8'
                      type='text'
                      name="rolName"
                      value={formData.rolName}
                      readOnly
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
      <ToastContainer />
    </div>
  );
};

export default ModalPerfil;
