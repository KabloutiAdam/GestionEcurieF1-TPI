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
    pictureLink: string;
    countryFlag: string;
    point: number
}

export type teamInterface = {
    id: number;
    name: string;
    pictureLink: string;
}

export type country = {
    id: number;
    name: string;
    countryFlag: string,
}

export type trackInterface = {
    id: number;
    name: string;
    length: number;
    trackOrder: number;
    pictureLink: string;
    country: number
}