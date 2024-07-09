import React, { useEffect, useState } from 'react';
import { api } from '../api/token';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserModal = ({ isOpen, onClose, user }) => {
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [estados, setEstados] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        nombre: '',
        Documento: '',
        correo: '',
        password: '',
        rolId: '',
        estadoId: '',
    });

    useEffect(() => {
        if (isOpen && user) {
            fetchUserDetails(user.id);
        }
    }, [isOpen, user]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.get('/roles');
                setRoles(response.data);
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

        fetchRoles();
        fetchEstados();
    }, []);

    const fetchUserDetails = async (userId) => {
        setLoading(true);
        try {
            const response = await api.get(`/usuarios/${userId}`);
            if (response.status === 200) {
                const { nombre, Documento, correo, RolId, EstadoId } = response.data;
                setFormData({
                    nombre: nombre || '',
                    Documento: Documento || '',
                    correo: correo || '',
                    rolId: RolId || '',
                    estadoId: EstadoId || '',
                });
                setLoading(false);
            } else {
                console.error('Error fetching user details:', response.data.message);
                toast.error('Error al cargar la información del usuario.', { position: 'top-right' });
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
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
        } else if (name === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,}$/;
            if (!passwordRegex.test(value)) {
            errorMessage = 'La contraseña debe contener una mayúscula, una minúscula, un carácter especial, y entre 8 a 20 caracteres.';
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
        const { nombre, correo, Documento, password, rolId, estadoId } = formData;

        if (!nombre || !correo || !Documento || !rolId || !estadoId) {
            toast.error('Todos los campos son obligatorios.', { position: 'top-right' });
            return;
        }

        setLoading(true);
        try {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
            const response = await api.put(`/usuarios/${user.id}`, {
                nombre,
                correo,
                password,
                Documento,
                RolId: rolId,
                EstadoId: estadoId,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
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
                    onClose: () => {
                        window.location.href = '/Usuarios';
                    },
                });
            } else {
                console.error('Error updating user profile:', response.data.message);
                toast.error('Error al actualizar la información del usuario.', { position: 'top-right' });
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
            toast.error('Error al actualizar la información del usuario.', { position: 'top-right' });
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
                                    <h6 className='font-bold text-center text-2xl mb-2'>Editar Usuario</h6>

                                    <div className='flex flex-col'>
                                        <label className='mb-1 font-bold text-sm'>Nombres y Apellidos *</label>
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
                                    <label className='mb-1 font-bold text-sm'>Contraseña *</label>
                                    <input
                                        className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                                        type='password'
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.password && <p className='text-red-400 text-sm mt-1'>{formErrors.password}</p>}
                                    </div> 

                                    <div className='flex flex-col'>
                                        <label className='mb-1 font-bold text-sm'>Rol *</label>
                                        <select
                                            className='bg-grisClaro text-sm rounded-lg px-2 h-8'
                                            name="rolId"
                                            value={formData.rolId}
                                            onChange={handleInputChange}
                                        >
                                            <option value=''>Seleccionar Rol</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.rolName}
                                                </option>
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
                <div className='sm:w-full md:w-1/3 flex flex-col justify-end'>
                    <div className='flex justify-between mb-4'>
                        <button className='btn-danger' onClick={onClose}>Cancelar</button>
                        <button className='btn-primary' onClick={handleUpdate}>Actualizar</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditUserModal;
