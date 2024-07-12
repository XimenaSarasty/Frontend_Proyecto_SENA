import React, { useEffect, useState } from 'react';
import { api } from '../api/token';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditInstructorModal = ({ isOpen, onClose, instructor }) => {
    const [loading, setLoading] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [estados, setEstados] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        usuarioId: '',
        estadoId: '',
    });

    useEffect(() => {
        if (isOpen && instructor) {
            fetchUsuariosDetails(instructor.id);
        }
    }, [isOpen, instructor]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await api.get('/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                toast.error('Error al cargar roles', { position: 'top-right' });
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

        fetchUsuarios();
        fetchEstados();
    }, []);

    const fetchUsuariosDetails = async (instructorId) => {
        setLoading(true);
        try {
            const response = await api.get(`/Instructor/${instructorId}`);
            if (response.status === 200) {
                const { nombre, correo, UsuarioId, EstadoId } = response.data;
                setFormData({
                    nombre: nombre || '',
                    correo: correo || '',
                    usuarioId: UsuarioId || '',
                    estadoId: EstadoId || '',
                });
                setLoading(false);
            } else {
                console.error('Error fetching instructor details:', response.data.message);
                toast.error('Error al cargar la información del usuario.', { position: 'top-right' });
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching instructor details:', error);
            toast.error('Error al cargar la información del usuario.', { position: 'top-right' });
            setLoading(false);
        }
    };

    const validateInput = (name, value) => {
        let errorMessage = '';
        if (name === 'nombre') {
            const nameRegex = /^[A-Za-z\s-_\u00C0-\u017F]+$/;
            if (!nameRegex.test(value) || /\d/.test(value)) {
                errorMessage = 'El nombre no puede contener caracteres especiales.';
            }
        } else if (name === 'correo') {
            const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!correoRegex.test(value)) {
                errorMessage = 'El correo debe ser un correo válido.';
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
        const { nombre, correo, usuarioId, estadoId } = formData;

        if (!nombre || !correo || !usuarioId || !estadoId) {
            toast.error('Todos los campos son obligatorios.', { position: 'top-right' });
            return;
        }

        setLoading(true);
        try {
            const response = await api.put(`/Instructor/${instructor.id}`, {
                nombre,
                correo,
                UsuarioId: usuarioId,
                EstadoId: estadoId,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status === 200) {
                toast.success('Usuario actualizado exitosamente', {
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
                console.error('Error updating instructor profile:', response.data.message);
                toast.error('Error al actualizar la información del usuario.', { position: 'top-right' });
            }
        } catch (error) {
            console.error('Error updating instructor profile:', error);
            if (error.response && error.response.status === 401) {
                window.location.href = '/';
            } else {
                toast.error('Error al actualizar la información del usuario.', { position: 'top-right' });
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
                                    <h6 className='font-bold text-center text-2xl mb-2'>Editar Instructor</h6>
                                    <div className='flex flex-col'>
                                        <label className='mb-1 font-bold text-sm'>Nombres y Apellidos *</label>
                                        <input
                                            className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                                            type='text'
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.nombre && <div className='text-red-400 text-sm mt-1 px-2'>{formErrors.nombre}</div>}
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
                                        {formErrors.correo && <div className='text-red-400 text-sm mt-1 px-2'>{formErrors.correo}</div>}
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='mb-1 font-bold text-sm'>Usuario *</label>
                                        <select
                                            className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                                            name="usuarioId"
                                            value={formData.usuarioId}
                                            onChange={handleInputChange}
                                        >
                                            <option value=''>Seleccionar Usuario</option>
                                            {usuarios.map((usuario) => (
                                                <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='mb-1 font-bold text-sm'>Estado *</label>
                                        <select
                                            className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                                            name="estadoId"
                                            value={formData.estadoId}
                                            onChange={handleInputChange}
                                        >
                                            <option value=''>Seleccionar Estado</option>
                                            {estados.map((estado) => (
                                                <option key={estado.id} value={estado.id}>{estado.estadoName}</option>
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
                        <button className='btn-primary2 mx-2' onClick={handleUpdate}>Actualizar</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditInstructorModal;
