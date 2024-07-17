import React, { useEffect, useState } from 'react';
import { api } from '../api/token';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditFichasModal = ({ isOpen, onClose, ficha }) => {
    const [loading, setLoading] = useState(false);
    const [estados, setEstados] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [usuario, setUsuario] = useState([]);
    const [formData, setFormData] = useState({
        NumeroFicha: '',
        EstadoId: '',
        UsuarioId: '',
    });

    useEffect(() => {
        if (isOpen && ficha) {
            fetchFichaDetails(ficha.id);
        }
    }, [isOpen, ficha]);    

    useEffect(() => {

            const fetchusuario = async () => {
            try {
                const response = await api.get('/usuarios');
                setUsuario(response.data);
            } catch (error) {
                showToastError('Error al cargar usuario');
            }
            };

        const fetchEstados = async () => {
            try {
                const response = await api.get('/Estado');
                setEstados(response.data);
            } catch (error) {
                toast.error('Error al cargar los estados', { position: 'top-right' });
            }
        };
        
        fetchusuario();
        fetchEstados();
    }, []);

    const fetchFichaDetails = async (fichaId) => {
        setLoading(true);
        try {
            const response = await api.get(`/Fichas/${fichaId}`);
            if (response.status === 200) {
                const { NumeroFicha, EstadoId, UsuarioId  } = response.data;
                setFormData({
                    NumeroFicha: NumeroFicha || '',
                    EstadoId: EstadoId || '',
                    UsuarioId: UsuarioId || '',
                  });
                setLoading(false);
            } else {
                console.error('Error fetching ficha details:', response.data.message);
                toast.error('Error al cargar la información de la ficha.', { position: 'top-right' });
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching ficha details:', error);
            toast.error('Error al cargar la información de la ficha.', { position: 'top-right' });
            setLoading(false);
        }
    };

    const validateInputFichas = (name, value) => {
        let errorMessage = '';
        if (name === 'NumeroFicha') {
            const numeroFichaRegex = /^[A-Za-z0-9\s-]+$/;
            if (!numeroFichaRegex.test(value)) {
                errorMessage = 'El número de ficha no puede contener caracteres especiales.';
            }
        }
        return errorMessage;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const errorMessage = validateInputFichas(name, value);
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateFichas = async () => {
        const { NumeroFicha, EstadoId, UsuarioId } = formData;

        if (!NumeroFicha || !EstadoId || !UsuarioId) {
            toast.error('Todos los campos son obligatorios.', { position: 'top-right' });
            return;
        }

        setLoading(true);
        try {
        const response = await api.put(`/Fichas/${ficha.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status === 200) {
                toast.success('Ficha actualizada exitosamente', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    onClose(response.data);
                }, 2000);

            } else {
                console.error('Error updating ficha profile:', response.data.message);
                toast.error('Error al actualizar la información de la ficha.', { position: 'top-right' });
            }
        } catch (error) {
            console.error('Error updating ficha profile:', error);
            if (error.response && error.response.status === 401) {
                window.location.href = '/';
            } else {
                toast.error('Error al actualizar la información de la ficha.', { position: 'top-right' });
            }
        } finally {
            setLoading(false);
        }
    };
        
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-fondo bg-opacity-50'>
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
                        ) : (
                            <div className='font-inter ml-2'>
                                <div className='space-y-2 md:space-y-2 text-left'>
                                    <h6 className='font-bold text-center text-2xl mb-2'>Editar Ficha</h6>

                                    <div className='flex flex-col'>
                                        <label className='mb-1 font-bold text-sm'>Número de Ficha *</label>
                                        <input
                                            className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                                            type='text'
                                            name="NumeroFicha"
                                            value={formData.NumeroFicha}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.NumeroFicha && <div className='text-red-400 text-sm mt-1 px-2'>{formErrors.NumeroFicha}</div>}
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='mb-1 font-bold text-sm'>Usuario *</label>
                                            <select
                                                className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                                                name="UsuarioId"
                                                value={formData.UsuarioId}
                                                onChange={handleInputChange}
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
                                            onChange={handleInputChange}
                                        >
                                            <option value=''>Seleccionar Estado</option>
                                            {estados.map((estado) => (
                                                <option key={estado.id} value={estado.id}>
                                                    {estado.estadoName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='sm:w-full md:w-full flex flex-col justify-end'>
                    <div className='flex justify-center mb-4 mx-2'>
                        <button className='btn-danger2 mx-2' onClick={onClose}>Cancelar</button>
                        <button className='btn-primary2 mx-2' onClick={handleUpdateFichas}>Actualizar</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditFichasModal;
