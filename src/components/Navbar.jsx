import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = () => {
        setShowConfirm(true);
        toast.warn(
            <div>
                <p>¿Seguro quieres cerrar la sesión?</p>
                <button onClick={confirmLogout} style={{ marginRight: '10px' }}>Sí</button>
                <button onClick={() => setShowConfirm(false)}>No</button>
            </div>,
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
    };

    const confirmLogout = () => {
        signout();
        Cookies.remove('token');
        navigate('/');
        toast.dismiss(); 
    };

    return (
        <div>
            <button className='btn-primary' onClick={handleLogout}>
                Cerrar Sesión
            </button>
            <ToastContainer />
        </div>
    );
};

export default Navbar;
