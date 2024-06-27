import { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../api/token';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const signin = async ({ Documento, password }) => {
        try {
            const response = await api.post('/login', { Documento, password });
            const { token } = response.data;
            setUser({ Documento }); 
            setIsAuthenticated(true);
            localStorage.setItem('token', token);
        } catch (error) {
            setErrors(error.response?.data || ['Error de autenticación']);
        }
    };

    const signout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ signin, signout, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    );
}
