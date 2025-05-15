import { useLocation } from "react-router";
import { useAuth } from "../authProvider";
import type { teamInterface } from "../interfaces";
import { useState } from "react";


type Props = {
    team: teamInterface
    onEdit: (team: teamInterface) => void
    onSelect?: (team: teamInterface) => void;
}

export default function TeamCard({ team, onEdit, onSelect }: Props) {

    const { currentUser } = useAuth();
    const { pathname } = useLocation();
    console.log(team.pictureLink)




    return (
        <>
            <div className={` grid grid-rows-[1fr_4fr_2fr] grid-cols-1 bg-black rounded-2xl ${pathname == '/game/teamSelection' ? "h-60 w-80 " : "h-100 w-150"}`}>
                <div className="row-span-1 row-start-1 flex flex-row items-start justify-end ">
                    {(currentUser?.role === "admin" && pathname != "/game/teamSelection") &&
                        <div
                            onClick={() => onEdit(team)}
                            className="w-12 h-12 m-5 p-2 flex flex-row items-center justify-center hover:bg-slate-600 hover:cursor-pointer rounded-2xl ">
                            <img src="images/logo/editer.png" className=" invert brightness-0 w-full h-full" alt="logo édition" />
                        </div>

                    }

                </div>
                <div
                    onClick={() => {
                        if (pathname === "/game/teamSelection" && onSelect) {
                            onSelect(team);
                        }
                    }}
                    className="row-span-1 row-start-2 flex flex-row items-center justify-center">
                    <div className="w-[70%] flex flex-row items-center justify-center">
                        <img className="w-[200px] h-[200px] object-cover rounded-2xl" src={`../images/teams/${team.pictureLink}`} alt={`image de ${team.name}`} />
                    </div>
                </div>

                <div className="w-full row-span-1 row-start-3 flex items-center justify-center ">
                    <p className="text-4xl font-bold text-white">{team.name}</p>
                </div>

            </div>

        </>

    )
}
