
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import type { user } from "../interfaces";
import { useAuth } from "../authProvider";


type protectedRouteProps = PropsWithChildren & {
    allowedRoles?: user['role'][]
}


export default function ProtectedRoute({ allowedRoles, children }: protectedRouteProps) {


    const { currentUser, isLoading } = useAuth()



    if (isLoading ||currentUser === undefined) {
        return <p>Loading</p>
    }


    if (
        currentUser === null ||
        (allowedRoles && !allowedRoles.includes(currentUser.role))
    ) {
        console.log(currentUser)
        return <Navigate to="/login" replace />;
    }

    return children
}


