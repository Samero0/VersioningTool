import { useCallback, useEffect, useState } from 'react';

import { API_URL } from '../constants';
import { TenoSessionService } from 'teno-session-service';

export const useAuthToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const login = useCallback(async () => {
        try {
            return await TenoSessionService.login(
                import.meta.env.VITE_USER_API,
                import.meta.env.VITE_PASSWORD_API,
                API_URL,
                'teno-web-application',
            );

        } catch (err) {
            setError(err as Error);
        }
    }, []);

    const logout = useCallback(async () => {
        if (token) {
            try {
                await TenoSessionService.logout(API_URL, token);
                setToken(null);
                console.log('logout succesfull')
            } catch (err) {
                setError(err as Error);
            }
        }
    }, [token]);

    useEffect(() => {
        if (!token) {
            void (async () => {
                const loginResponse = await login();
                if (loginResponse) {
                    setToken(loginResponse.token);
                    console.log("auth Token", API_URL);
                    console.log("auth Token", loginResponse.token);
                }
            })();
        }
    }, [login, token]);

    return { token, error, logout };
};