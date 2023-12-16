import { createContext, useContext, useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../firebase/init";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        loading: true,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthState({ user, loading: false });
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
