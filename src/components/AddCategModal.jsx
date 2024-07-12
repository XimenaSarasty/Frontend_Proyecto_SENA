import React, { useEffect, useState } from 'react';
import { api } from '../api/token';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        RolId: '',
      });
      const [formErrors, setFormErrors] = useState({});
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        if (isOpen) {
          fetchUserProfile();
        }
      }, [isOpen]);
    
       
      const fetchUserProfile = async () => {
        try {
          const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
          const response = await api.get('/perfil', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
    
          if (response.status === 200) {
            setFormErrors({});
          } else {
            setFormErrors({ fetch: response.data.message });
          }
        } catch (error) {
          setFormErrors({ fetch: 'Error al cargar la información del usuario.' });
        } finally {
          setLoading(false);
        }
      }; 
    
      const showToastError = (message) => {
        toast.error(message, {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
    
      const handleCreate = async () => {   
        if (!rolName) {
          showToastError('El campo es obligatorio.');
          return;
        }
    
        try {
          const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
          const response = await api.post('/roles', formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
    
          if (response.status === 201) {
            toast.success('Rol agregado exitosamente', {
              position: 'top-right',
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            onClose();
            window.location.href = '/roles';
    
          } else {
            showToastError('Ocurrió un error!, por favor intenta de nuevo.');
          }
        } catch (error) {
          showToastError('Ocurrió un error!, por favor intenta de nuevo.');
        }
      };
    
      return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-fondo bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
          <div className='bg-white rounded-lg shadow-lg sm:w-full md:w-1/4 mt-4 max-h-screen overflow-y-auto'>
            <div className='flex justify-end p-2'>
              <button onClick={onClose}>
                <FaTimes className='text-black w-4 h-4' />
              </button>
            </div>
            <div className='flex items-center justify-center space-y-4 md:space-y-0 mb-4'>
              <div className='w-full md:w-3/4'>
                {loading ? (
                  <p>Cargando información...</p>
                ) : formErrors.fetch ? (
                  <p className='text-red-500'>{formErrors.fetch}</p>
                ) : (
                  <div className='font-inter ml-2'>
                    <div className='space-y-2 md:space-y-2 text-left'>
                      <h6 className='font-bold text-center text-2xl mb-2'>Agregar Categoria</h6>
    
                      <div className='flex flex-col'>
                        <label className='mb-1 font-bold text-sm'>Categoria Nueva *</label>
                        <input
                          className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                          type='text'
                          name="rolName"
                          value={formData.rolName}
                        //   onChange={}
                          onKeyPress={(e) => {
                            if (/\d/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className='sm:w-full md:w-full flex flex-col justify-end'>
                      <div className='flex justify-center mt-4 mb-4 mx-2'>
                        <button className='btn-danger2 mx-2' onClick={onClose}>Cancelar</button>
                        <button className='btn-primary2 mx-2'onClick={handleCreate}>Agregar</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      );
    };    

export default AddCategModal
