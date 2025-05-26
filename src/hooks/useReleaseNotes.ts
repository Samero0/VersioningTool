// hooks/useReleaseNotes.ts
import { API_BASE_URL, ENV_API_URLS } from '../constants';
import { useCallback, useEffect, useState } from 'react';

import StateDatas from '../api/StateDatas';
// import { TenoSessionService } from 'teno-session-service';
import axios from 'axios';
import { cleanContent } from './contentCleaner';

interface ReleaseNote {
    version: string;
    date: string;
    content: string;
}

const getApiUrl = (dbName: string): string => {
    return ENV_API_URLS[dbName] ?? ENV_API_URLS['imt-dev'];
};

export const useReleaseNotes = (dbName: string = 'imt') => {

    console.log("name: " + dbName);
    console.log("uri: " + getApiUrl(dbName));

    const [authError, setAuthError] = useState<Error | null>(null);
    const [releaseNotes, setReleaseNotes] = useState<ReleaseNote[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [save, setSave] = useState<boolean>(false);
    const stateDatas = StateDatas.getInstance();
    const API_URL = getApiUrl(dbName);

    const parseDateString = (dateString: string) => {
        const [day, month, year] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const getData = useCallback(async (token: string) => {
        if (!token || !API_URL) return;

        try {
            const path = '/about/v1/updates';
            const response = await axios.get(
                `${API_URL.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`,
                {
                    headers: {
                        'x-session-token': token,
                    },
                }
            );

            setReleaseNotes(response.data || []);
            
            //Portal updates data
            const jsonPortalUpdates = JSON.parse(response.data.platformUpdateDetails);
            stateDatas.PortalUpadtesVersion = jsonPortalUpdates["version"];
            stateDatas.PortalUpdatesUpdatedAt = jsonPortalUpdates["updatedAt"];
            stateDatas.PortalUpdatesNextScheduledUpdate = jsonPortalUpdates["nextScheduledUpdate"];
            stateDatas.PortalUpdatesEnabled = jsonPortalUpdates["enabled"] ?? false;

            let a = response.data.releaseNotes.replace(/^\[|\]$/g, '')
            a = cleanContent(a)
            console.log(JSON.parse(a).version);
            
            // Release notes data
            const jsonReleaseNotes = JSON.parse(a);
            stateDatas.ReleaseNotesVersion = jsonReleaseNotes["version"];
            stateDatas.ReleaseNotesStartDate = parseDateString(jsonReleaseNotes["date"].replace(/\//g, "-"));
            stateDatas.ReleaseNotesContent = jsonReleaseNotes["content"];

        } catch (err) {
            setError(err instanceof Error ? err : new Error('Error al obtener las notas'));
        } finally {
            setLoading(false);
        }
    }, [API_URL, stateDatas]);

    const logout = useCallback(async (token: string) => {
        if (token) {
            try {
                await TenoSessionService.logout(API_BASE_URL, token);
                console.log(`Logout realizado con el token: ${token}`);
            } catch (err) {
                setAuthError(err instanceof Error ? err : new Error("Error desconocido"));
            }
        }
    }, []);

    const login = useCallback(async () => {
        let token = "";
        try {
            const response = await TenoSessionService.login(
                import.meta.env.VITE_USER_API,
                import.meta.env.VITE_PASSWORD_API,
                API_BASE_URL,
                'teno-web-application',
            );
            token = response.token;
            console.log(`Token obtenido: ${response.token}`);
            await getData(token);
            await logout(token);
            return token;
        } catch (err) {
            setAuthError(err instanceof Error ? err : new Error("Error desconocido"));
        }
    }, [getData, logout]);

    const loginNotLogout = useCallback(async () => {
        let token = "";
        try {
            const response = await TenoSessionService.login(
                import.meta.env.VITE_USER_API,
                import.meta.env.VITE_PASSWORD_API,
                API_BASE_URL,
                'teno-web-application',
            );
            token = response.token;
            console.log(`Token obtenido: ${response.token}`);
            await getData(token);
            return token;
        } catch (err) {
            setAuthError(err instanceof Error ? err : new Error("Error desconocido"));
        }
    }, [getData]);

    useEffect(() => {
        const saveData = async () => {
            if (save) {
                const token = await loginNotLogout();
                console.log(token);
                
                setSave(false);
                
                const dataReleaseNotesCode = localStorage.getItem("ReleaseNotesCode");
                // const dataPortalUpdatesCode = localStorage.getItem("PortalUpdatesCode")?.replace(/\\\\/g, '\\');
                const dataPortalUpdatesCode = localStorage.getItem("PortalUpdatesCode")?.replace(/\\"/g, '"');
                const headers = {
                    'Content-Type': 'application/json',
                    'x-session-token': token,
                }
                const body = {
                    "platformUpdateDetails": dataPortalUpdatesCode,
                    "releaseNotes": dataReleaseNotesCode
                }
                await axios.put(API_URL + '/about/v1/updates', body , { headers });

                await logout(token!);
            }
        };

        void saveData();
    }, [API_URL, loginNotLogout, logout, save]);

    useEffect(() => {
        void login();
    }, [login]);

    return { releaseNotes, loading, error, authError, save, setSave };
};
