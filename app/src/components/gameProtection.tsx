
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import type { user } from "../interfaces";
import { useAuth } from "../authProvider";


type protectedGameProps = PropsWithChildren & {
    allowedRoles?: user['role'][]
}


export default function ProtectedGame({ allowedRoles, children }: protectedGameProps) {


    const { currentUser, isLoading } = useAuth()



    if (isLoading ||currentUser === undefined) {
        return <p>Loading</p>
    }

    if(!localStorage.getItem('inGame')) {
        return <Navigate to="/mainPage" replace />;
    }


    if (
        currentUser === null ||
        (allowedRoles && !allowedRoles.includes(currentUser.role)) 
    ) {
        
        return <Navigate to="/login" replace />;
    }

    return children
}


