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
    const [authToken, setAuthToken] = useState<string | null>();
    const [currentUser, setCurrentUser] = useState<user | null>();
    const [isUserConnected, setIsUserConnected] = useState<boolean>(!!authToken);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    

    useEffect(() => {

        async function fetchUser(){

            
            try{
                
                const response = await getUser()

                const { authToken, user } = response[1];
                
                setAuthToken(authToken);
                setCurrentUser(user);
                setIsUserConnected(true);
                
            } catch{
                setAuthToken(null);
                setCurrentUser(null);
                setIsUserConnected(false);
            } finally{
                
                setIsLoading(false);
            }

        }

        fetchUser()
        
    }, []);

    async function handleLogin(email: string, password: string) {
        try {
            const response = await login(email, password);

            const { authToken, user } = response[1];
            console.log(user)
            setAuthToken(authToken);
            setCurrentUser(user);
            setIsUserConnected(true)
            localStorage.setItem("authUser", JSON.stringify(user));
            localStorage.setItem('userToken', authToken)
            return null

        } catch {
            setAuthToken(null);
            setCurrentUser(null);
            return "erreur"
        }




    }

    async function handleLogout() {
        localStorage.removeItem("userToken");
        localStorage.removeItem("authUser");
        setIsUserConnected(false)
        setAuthToken(null);
        setCurrentUser(undefined);
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