// Interface du contexte d'authentification
export interface AuthContextType {
    token: string | null; // Un token string ou null
    isUserConnected: boolean; // Est ce que l'utilisateur est connecté
    login: (token: string) => void; // Fonction pour se login avec le token comme paramètre
    logout: () => void; // Fonction pour se logout
}

// Interface d'un utilisateur
export type user = {
    id: number;
    login: string;
    role: string;
}

export type driverInterface = {
    id: number;
    firstname: string;
    lastname: string;
    rating: number;
    nationality: string;
    team: string;
}