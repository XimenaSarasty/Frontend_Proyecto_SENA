import { createContext, useState, useContext } from "react";
import getToken from '../api/token';
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be withinh an AuthProvider");
    } 
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticathed, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const signup = async (user) => {
        try {
            // const res = await registerRequest(user)
            // console.log(res);
            // setUser(res.data);
            setIsAuthenticated(true);
            
        } catch (error) {
            setErrors(error.response.data)
            console.log(error);
        }
    }

    const signin = async (user) => {
        try {
            const res = await getToken(user);
            console.log(res.data);
            setIsAuthenticated(true);
            setUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticathed, 
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}
