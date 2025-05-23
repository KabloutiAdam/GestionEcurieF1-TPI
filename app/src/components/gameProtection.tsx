
import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { user } from "../interfaces";
import { useAuth } from "../authProvider";
import { useGame } from "../context/gameContext";


type protectedGameProps = PropsWithChildren & {
    allowedRoles?: user['role'][]
}


export default function ProtectedGame({ allowedRoles, children }: protectedGameProps) {


    const { currentUser, isLoading } = useAuth()
    const { gameState } = useGame()
    const { pathname } = useLocation();

    setTimeout(() => {
        console.log(gameState);
    }, 2000);


    if (isLoading || currentUser === undefined) {
        return <p>Loading</p>
    }



    if (!localStorage.getItem('inGame')) {
        return <Navigate to="/mainPage" replace />;
    }

    if ((localStorage.getItem("inGame") != "true") && pathname !== '/game/teamSelection') {
        return <Navigate to="/game/teamSelection" replace />;
    }

    if (
        currentUser === null ||
        (allowedRoles && !allowedRoles.includes(currentUser.role))
    ) {

        return <Navigate to="/login" replace />;
    }

    return children
}


