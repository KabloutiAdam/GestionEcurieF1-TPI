import { useAuth } from "../authProvider";
import type { teamInterface } from "../interfaces";


type Props = {
    team: teamInterface
    onEdit: (team: teamInterface) => void
}

export default function TeamCard({ team, onEdit }: Props) {

    const { currentUser } = useAuth();

    return (
        <>
            <div className=" h-100 w-150  grid grid-rows-[1fr_4fr_2fr] grid-cols-1 bg-black rounded-2xl ">
                <div className="row-span-1 row-start-1 flex flex-row items-start justify-end ">
                    {currentUser?.role === "admin" &&
                        <div
                            onClick={() => onEdit(team)}
                            className="w-12 h-12 m-5 p-2 flex flex-row items-center justify-center hover:bg-slate-600 hover:cursor-pointer rounded-2xl ">
                            <img src="images/logo/editer.png" className=" invert brightness-0 w-full h-full" alt="logo édition" />
                        </div>

                    }

                </div>
                <div className="row-span-1 row-start-2 flex flex-row items-center justify-center">
                    <div className="w-[70%] flex flex-row items-center justify-center">
                        <img className="w-[200px] h-[200px] object-cover rounded-2xl" src={`images/teams/${team.pictureLink}`} alt={`image de ${team.name}`} />
                    </div>
                </div>

                <div className="w-full row-span-1 row-start-3 flex items-center justify-center ">
                    <p className="ml-8 text-4xl font-bold text-white">{team.name}</p>
                </div>

            </div>

        </>

    )
}
