import { useLocation } from "react-router";
import { useAuth } from "../authProvider";
import type { trackInterface } from "../interfaces";
import { useEffect, useState } from "react";


type Props = {
    track: trackInterface;
    onEdit: (track: trackInterface) => void;
    onDelete: (track: trackInterface) => void;
    onSelect?: (track: trackInterface) => void;
}

export default function TrackCard({ track, onEdit, onSelect, onDelete }: Props) {

    const { authToken } = useAuth();
    const { pathname } = useLocation();
    const [userRole, setUserRole] = useState<string | null>(null)


     useEffect(() => {
        if (authToken) {
            try {
                const decoded = JSON.parse(atob(authToken.split('.')[1]));
                setUserRole(decoded.role);
            } catch (e) {
                console.error("Erreur lors du décodage du token :", e);
            }
        }
    }, [authToken]);




    return (
        <>
            <div className={` grid grid-rows-[1fr_4fr_2fr] grid-cols-1 bg-black rounded-2xl ${pathname == '/game/teamSelection' ? "h-60 w-80 " : "h-100 w-150"}`}>
                <div className="row-span-1 row-start-1 flex flex-row items-start justify-end ">
                    {(userRole === "admin" && pathname != "/game/teamSelection") &&
                        <div className="flex">
                            <div
                                onClick={() => onEdit(track)}
                                className="w-12 h-12 m-5 p-2 flex flex-row items-center justify-center hover:bg-slate-600 hover:cursor-pointer rounded-2xl ">
                                <img src="../../images/logo/editer.png" className=" invert brightness-0 w-full h-full" alt="logo édition" />
                            </div>
                            <div
                                onClick={() => onDelete(track)}
                                className="w-12 h-12 m-5 p-2 flex flex-row items-center justify-center hover:bg-slate-600 hover:cursor-pointer rounded-2xl ">
                                <img src="../../images/logo/supprimer.png" className=" invert brightness-0 w-full h-full" alt="logo édition" />
                            </div>
                        </div>

                    }

                </div>
                <div
                    onClick={() => {
                        if (pathname === "/game/teamSelection" && onSelect) {
                            onSelect(track);
                        }
                    }}
                    className="row-span-1 row-start-2 flex flex-row items-center justify-center">
                    <div className="w-[70%] flex flex-row items-center justify-center">
                        <img className=" h-[250px] object-cover rounded-2xl" src={`../images/tracks/${track.pictureLink}`} alt={`image de ${track.name}`} />
                    </div>
                </div>

                <div className="w-full row-span-1 row-start-3 flex items-center justify-center ">
                    <p className="text-4xl font-bold text-white">{track.name}</p>
                </div>

            </div>

        </>

    )
}
