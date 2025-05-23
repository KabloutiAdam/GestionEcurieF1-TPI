import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authProvider";

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles?: string[]; 
};

export default function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
    const { authToken, isLoading, handleLogout } = useAuth();
    
    if (isLoading) {
        return <p>Chargement...</p>;
    }

   

    if (!authToken) {
        return <Navigate to="/login" replace />;
    }

    try {
       
        const payload = JSON.parse(atob(authToken.split('.')[1]));

        const now = Date.now() / 1000;
        if (payload.exp < now) {
            
            handleLogout()
            return null
        }

        const userRole = payload.role;

        
        if (allowedRoles && !allowedRoles.includes(userRole)) {
            return <Navigate to="/login" replace />;
        }

        return children;

    } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return <Navigate to="/login" replace />;
    }
}
