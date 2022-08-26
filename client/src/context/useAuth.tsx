import React, { createContext, useState, useEffect, useMemo, useContext, ReactNode } from 'react';
import { User, AuthContext as IAuthContext } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';
import { request } from '../utils/request';
import { BASE_URL } from '../../api-config.json';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();
    const activeLocation = useLocation();

    const spaAuthUrls = ['/login', '/register'];
    const urls = {
        login: `${BASE_URL}/auth/login`,
        logout: `${BASE_URL}/auth/logout`,
        register: `${BASE_URL}/auth/register`,
        activeUser: `${BASE_URL}/sanctum/csrf-cookie`,
        csrf: `${BASE_URL}/sanctum/csrf-cookie`
    };

    const csrf = () => request.get(urls.csrf);

    const checkSession = async () => request.get(`${BASE_URL}/auth/user`).then(({ data }) => setUser(data)).catch(({ response }) => {
        if (response.status === 401) {
            if (!spaAuthUrls.includes(activeLocation.pathname)) navigate('/login');
            setUser(null);
        } else {
            if (response.status === 200) {
                setUser(response.data);
                navigate('/');
            }
        }
    });

    const login = async (email: string, password: string) => {

        setLoading(true);

        setErrors([]);

        await csrf();

        request.post(urls.login, { email, password }).then(async (response) => {
            await checkSession();
            if (response.status === 204) navigate('/');
        }).catch(({ response }) => {
            setErrors(response.data.errors);
        });

        setLoading(false);
    };

    const register = async (name: string, email: string, password: string, password_confirmation: string) => {
        setLoading(true);

        setErrors([]);

        await csrf();

        request.post(urls.register, { name, email, password, password_confirmation }).then(async (response) => {
            await checkSession();
            if (response.status === 204) navigate('/');
        }).catch(({ response }) => {
            setErrors(response.data.errors);
        });

        setLoading(false);
    };


    const logout = async () => request.post(urls.logout).then(() => {
        setUser(null);
        navigate('/login');
    });

    useEffect(() => {
        if (!spaAuthUrls.includes(activeLocation.pathname)) {
            (async () => {
                setLoading(true);

                await csrf();

                await checkSession();

                setLoading(false);
            })();
        }
    }, []);

    const memoedValue = useMemo(() => ({
        user,
        loading,
        login,
        register,
        logout,
        csrf,
        errors,
        checkSession,
    }), [user, loading, errors]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}