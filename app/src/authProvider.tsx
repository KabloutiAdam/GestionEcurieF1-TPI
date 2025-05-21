import type { user } from './interfaces';
import { getUser, login } from './api/auth';
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import type { PropsWithChildren } from 'react';

type AuthContext = {
    authToken?: string | null;
    currentUser?: user | null;
    isUserConnected: boolean;
    isLoading: boolean;
    handleLogin: (email: string, password: string) => Promise<"erreur" | null>;
    handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem("userToken") || null);
    const [currentUser, setCurrentUser] = useState<user | null>(null);
    const [isUserConnected, setIsUserConnected] = useState<boolean>(!!authToken);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem("userToken");
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await getUser(); 
                const user = response[1].user;

                setAuthToken(token);
                setCurrentUser({
                    id: user.id,
                    login: user.email,
                    role: user.role,
                });
                setIsUserConnected(true);
            } catch (error) {
                console.error("Erreur getUser :", error);
                setAuthToken(null);
                setCurrentUser(null);
                setIsUserConnected(false);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, []);

    async function handleLogin(email: string, password: string) {
        try {
            const response = await login(email, password);
            const authToken = response[1].token;

            setAuthToken(authToken);
            setIsUserConnected(true);
            localStorage.setItem('userToken', authToken);
            try {
                const decoded = JSON.parse(atob(authToken.split('.')[1]));
                setCurrentUser({
                    id: decoded.id,
                    login: decoded.email,
                    role: decoded.role,
                });
            } catch (err) {
                console.error("Erreur décodage token :", err);
            }

            return null;
        } catch {
            setAuthToken(null);
            setCurrentUser(null);
            setIsUserConnected(false);
            return "erreur";
        }
    }

    async function handleLogout() {
        localStorage.removeItem("userToken");
        setIsUserConnected(false);
        setAuthToken(null);
        setCurrentUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                authToken,
                currentUser,
                isUserConnected,
                isLoading,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used inside of a AuthProvider');
    }
    return context;
}
