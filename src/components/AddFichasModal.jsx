import React, { useEffect, useState } from 'react';
import { api } from '../api/token';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFichasModal = ({ isOpen, onClose, ficha }) => {
  const [formData, setFormData] = useState({
    NumeroFicha: '',
    EstadoId: '',
    UsuarioId: '',
  });
  const [usuario, setUsuario] = useState([]);
  const [estados, setEstados] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchFichaProfile();
    }
  }, [isOpen]);

  useEffect(() => {
    if (ficha) {
      setFormData({
        NumeroFicha: ficha.NumeroFicha || '',
        EstadoId: ficha.EstadoId || '',
        UsuarioId: ficha.UsuarioId || '',
      });
    }
  }, [ficha]);

  useEffect(() => {
    const fetchusuario = async () => {
    try {
        const response = await api.get('/usuarios');
        setUsuario(response.data);
    } catch (error) {
        showToastError('Error al cargar usuario');
    }
    };

    const fetchStates = async () => {
    try {
        const response = await api.get('/Estado');
        setEstados(response.data);
    } catch (error) {
        showToastError('Error al cargar los estados');
    }
    };

    fetchusuario();
    fetchStates();
}, []);

  const fetchFichaProfile = async () => {
    setLoading(true);
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
      setFormErrors({ fetch: 'Error al cargar la información de la ficha.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChangeFichas = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleCreateFichas = async () => {
    const { NumeroFicha, EstadoId, UsuarioId } = formData;
  
    if (!NumeroFicha || !EstadoId || !UsuarioId) {
      showToastError('Todos los campos son obligatorios.');
      return;
    }  
    
    setLoading(true);

    try {
        const dataToSend = {
            NumeroFicha,
            UsuarioId: parseInt(UsuarioId, 10), 
            EstadoId: parseInt(EstadoId, 10), 
        };           
        
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
        const response = await api.post('/Fichas', dataToSend, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
  
        if (response.status === 200) {
            toast.success('Ficha agregada exitosamente', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                // onClose(response.data);
            }, 2000);
        } else {
            showToastError('Ocurrió un error al agregar la ficha.');
        }
    } catch (error) {
        console.log('Error response data:', error.response?.data); 
        showToastError(error.response?.data?.message || 'Ocurrió un error al agregar la ficha.');
    } finally {
        setLoading(false);
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
                  <h6 className='font-bold text-center text-2xl mb-2'>Agregar Ficha</h6>

                  <div className='flex flex-col'>
                    <label className='mb-1 font-bold text-sm'>Número de Ficha *</label>
                    <input
                      className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                      type='text'
                      name="NumeroFicha"
                      value={formData.NumeroFicha}
                      onChange={handleInputChangeFichas}
                    />
                    {formErrors.NumeroFicha && <div className='text-red-400 text-sm mt-1'>{formErrors.NumeroFicha}</div>}
                  </div>

                  <div className='flex flex-col'>
                      <label className='mb-1 font-bold text-sm'>Usuario *</label>
                        <select
                            className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                            name="UsuarioId"
                            value={formData.UsuarioId}
                            onChange={handleInputChangeFichas}
                       >
                            <option value=''>Seleccionar Usuario</option>
                            {usuario.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                            ))}
                        </select>
                    </div>

                  <div className='flex flex-col'>
                    <label className='mb-1 font-bold text-sm'>Estado *</label>
                    <select
                      className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                      name="EstadoId"
                      value={formData.EstadoId}
                      onChange={handleInputChangeFichas}
                    >
                      <option value=''>Seleccione un estado</option>
                      {estados.map((estado) => (
                        <option
                          key={estado.id}
                          value={estado.id}
                          style={{
                            color: estado.estadoName === 'ACTIVO' ? 'green' : estado.estadoName === 'INACTIVO' ? 'red' : 'inherit',
                          }}
                        >
                          {estado.estadoName}
                        </option>
                      ))}
                    </select>
                    {formErrors.EstadoId && <div className='text-red-400 text-sm mt-1'>{formErrors.EstadoId}</div>}
                  </div>
                </div>
                <div className='sm:w-full md:w-full flex flex-col justify-end'>
                  <div className='flex justify-center mt-4 mb-4 mx-2'>
                    <button className='btn-danger2 mx-2' onClick={onClose}>Cancelar</button>
                    <button className='btn-primary2 mx-2' onClick={handleCreateFichas}>Agregar</button>
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

export default AddFichasModal;
