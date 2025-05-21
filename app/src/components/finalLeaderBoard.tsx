import { useEffect, useMemo, useState } from "react";
import { useGame } from "../context/gameContext";
import type { driverInterface, teamInterface } from "../interfaces";
import axios from "axios";
import DriverCard from "./driverCard";


type Props = {
    isResult: boolean;
    isDriver: boolean;
    driverList: driverInterface[] | null;

};


export default function FinalLeaderBoard({ driverList, isResult, isDriver }: Props) {

    const { selectedDrivers, selectedTeam } = useGame()

    const [teamList, setTeamList] = useState<teamInterface[] | null>(null);
    

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await axios.get("/api/teams");
                setTeamList(res.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des équipes :", error);
            }
        };
        
        fetchTeam();
    }, []);
    const computedTeamList = useMemo(() => {
        if (!teamList || !driverList) return [];


        const updatedTeams = teamList.map(team => ({
            ...team,
            nbPoint: 0
        }));


        driverList.forEach(driver => {
            const team = updatedTeams.find(t => t.name === driver.team);
            if (team) {
                team.nbPoint += driver.point || 0;
            }
        });


        return updatedTeams.sort((a, b) => b.nbPoint - a.nbPoint);

    }, [teamList, driverList]);


    let counter = 0
    if (!driverList) return null;

    const orderedDrivers = driverList
        ? isResult
            ? [...driverList]
            : [...driverList].sort((a, b) => b.point - a.point)
        : [];
    const shortDriverList = orderedDrivers.slice(3, orderedDrivers.length - 1);
    const shortTeamList = computedTeamList.slice(3, computedTeamList.length - 1);

    return (

        <>

            <div className="w-[90%] h-[70%] overflow-y-scroll ">
                <div className="w-full h-100  grid-cols-3 grid ">


                    {isDriver && (
                        <>
                            <div className="w-full h-full col-span-1 col-start-1 flex justify-center items-center p-5">
                                <div className={`w-full h-full rounded-2xl flex items-center flex-col justify-center ${orderedDrivers[1].id === selectedDrivers[0].id || orderedDrivers[1].id === selectedDrivers[1].id ? "bg-red-900" : "bg-[#191919]"}`}>
                                    <div className="w-full h-[20%]  rounded-2xl flex items-center justify-start pl-6">
                                        <p className="text-3xl font-black text-[#c2c2c2] mr-5">#2</p>
                                        <p className="text-2xl font-bold text-white">{orderedDrivers[1].point} points</p>
                                    </div>
                                    <div className="w-full h-[80%] rounded-2xl flex flex-col items-center justify-center">
                                        <div className="w-full h-[70%] flex justify-center items-center">
                                            <img className="h-50" src={`/images/drivers/${orderedDrivers[1].pictureLink}`} alt="" />
                                        </div>
                                        <div className="w-full h-[30%] flex flex-col justify-center items-center">
                                            <p className="text-2xl font-bold text-white">{orderedDrivers[1].firstname + " " + orderedDrivers[1].lastname}</p>
                                            <p className="text-2xl font-bold text-white italic">{orderedDrivers[1].team}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="w-full h-full col-span-1 col-start-2 flex justify-center items-center p-5">
                                <div className={`w-full h-full rounded-2xl flex items-center flex-col justify-center ${orderedDrivers[0].id === selectedDrivers[0].id || orderedDrivers[0].id === selectedDrivers[1].id ? "bg-red-900" : "bg-[#191919]"}`}>
                                    <div className="w-full h-[20%]  rounded-2xl flex items-center justify-start pl-6">
                                        <p className="text-3xl font-black text-[#fab011] mr-5">#1</p>
                                        <p className="text-2xl font-bold text-white">{orderedDrivers[0].point} points</p>
                                    </div>
                                    <div className="w-full h-[80%] rounded-2xl flex flex-col items-center justify-center">
                                        <div className="w-full h-[70%] flex justify-center items-center">
                                            <img className="h-50" src={`/images/drivers/${orderedDrivers[0].pictureLink}`} alt="" />
                                        </div>
                                        <div className="w-full h-[30%] flex flex-col justify-center items-center">
                                            <p className="text-2xl font-bold text-white">{orderedDrivers[0].firstname + " " + orderedDrivers[0].lastname}</p>
                                            <p className="text-2xl font-bold text-white italic">{orderedDrivers[0].team}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="w-full h-full col-span-1 col-start-3 flex justify-center items-center p-5">
                                <div className={`w-full h-full rounded-2xl flex items-center flex-col justify-center ${orderedDrivers[2].id === selectedDrivers[0].id || orderedDrivers[2].id === selectedDrivers[1].id ? "bg-red-900" : "bg-[#191919]"}`}>
                                    <div className="w-full h-[20%]  rounded-2xl flex items-center justify-start pl-6">
                                        <p className="text-3xl font-black text-[#a55800] mr-5">#3</p>
                                        <p className="text-2xl font-bold text-white">{orderedDrivers[2].point} points</p>
                                    </div>
                                    <div className="w-full h-[80%] rounded-2xl flex flex-col items-center justify-center">
                                        <div className="w-full h-[70%] flex justify-center items-center">
                                            <img className="h-50" src={`/images/drivers/${orderedDrivers[2].pictureLink}`} alt="" />
                                        </div>
                                        <div className="w-full h-[30%] flex flex-col justify-center items-center">
                                            <p className="text-2xl font-bold text-white">{orderedDrivers[2].firstname + " " + orderedDrivers[2].lastname}</p>
                                            <p className="text-2xl font-bold text-white italic">{orderedDrivers[2].team}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </>


                    )}

                    {!isDriver && (
                        <>
                            <div className="w-full h-full col-span-1 col-start-1 flex justify-center items-center p-5">
                                <div className={`w-full h-full rounded-2xl flex items-center flex-col justify-center ${computedTeamList[1].id === selectedTeam?.id ? "bg-red-900" : "bg-[#191919]"}`}>
                                    <div className="w-full h-[20%]  rounded-2xl flex items-center justify-start pl-6">
                                        <p className="text-3xl font-black text-[#c2c2c2] mr-5">#2</p>
                                        <p className="text-2xl font-bold text-white">{computedTeamList[1].nbPoint} points</p>
                                    </div>
                                    <div className="w-full h-[80%] rounded-2xl flex flex-col items-center justify-center">
                                        <div className="w-full h-[70%] flex justify-center items-center">
                                            <img className="h-50" src={`/images/teams/${computedTeamList[1].pictureLink}`} alt="" />
                                        </div>
                                        <div className="w-full h-[30%] flex justify-center items-center">
                                            <p className="text-2xl font-bold text-white">{computedTeamList[1].name}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="w-full h-full col-span-1 col-start-2 flex justify-center items-center p-5">
                                <div className={`w-full h-full rounded-2xl flex items-center flex-col justify-center ${computedTeamList[0].id === selectedTeam?.id ? "bg-red-900" : "bg-[#191919]"}`}>
                                    <div className="w-full h-[20%]  rounded-2xl flex items-center justify-start pl-6">
                                        <p className="text-3xl font-black text-[#fab011] mr-5">#1</p>
                                        <p className="text-2xl font-bold text-white">{computedTeamList[0].nbPoint} points</p>
                                    </div>
                                    <div className="w-full h-[80%] rounded-2xl flex flex-col items-center justify-center">
                                        <div className="w-full h-[70%] flex justify-center items-center">
                                            <img className="h-50" src={`/images/teams/${computedTeamList[0].pictureLink}`} alt="" />
                                        </div>
                                        <div className="w-full h-[30%] flex justify-center items-center">
                                            <p className="text-2xl font-bold text-white">{computedTeamList[0].name}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="w-full h-full col-span-1 col-start-3 flex justify-center items-center p-5">
                                <div className={`w-full h-full rounded-2xl flex items-center flex-col justify-center ${computedTeamList[2].id === selectedTeam?.id ? "bg-red-900" : "bg-[#191919]"}`}>
                                    <div className="w-full h-[20%]  rounded-2xl flex items-center justify-start pl-6">
                                        <p className="text-3xl font-black text-[#a55800] mr-5">#3</p>
                                        <p className="text-2xl font-bold text-white">{computedTeamList[2].nbPoint} points</p>
                                    </div>
                                    <div className="w-full h-[80%] rounded-2xl flex flex-col items-center justify-center">
                                        <div className="w-full h-[70%] flex justify-center items-center">
                                            <img className="h-50" src={`/images/teams/${computedTeamList[2].pictureLink}`} alt="" />
                                        </div>
                                        <div className="w-full h-[30%] flex justify-center items-center">
                                            <p className="text-2xl font-bold text-white">{computedTeamList[2].name}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </>


                    )}






                </div>

                {isDriver ? (

                    <>
                        <table className="w-full">
                            <tbody>
                                <tr className="text-start h-10 text-2xl italic font-bold text-white">
                                    <th>Pos</th>
                                    <th>Nom du pilote</th>
                                    <th>Ecurie</th>
                                    <th>Points gagnés</th>
                                </tr>
                                {shortDriverList.map((driver, index) => {
                                    if (driver.point == null) driver.point = 0;

                                    const isUserDriver = selectedDrivers.length >= 2 &&
                                        (driver.id === selectedDrivers[0].id || driver.id === selectedDrivers[1].id);

                                    return (
                                        <tr key={driver.firstname} className={`text-white text-xl font-medium h-10 ${isUserDriver ? "bg-[#d44444]" : ""}`}>
                                            <td className="pl-10">{index + 4}</td>
                                            <td className="pl-10">{driver.firstname + " " + driver.lastname}</td>
                                            <td className="pl-10">{driver.team}</td>
                                            <td className="pl-10">{driver.point}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                ) :
                    <>
                        <div className="w-[90%] h-[70%] overflow-y-scroll ">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-start h-10 text-2xl italic font-bold text-white">
                                        <th>Pos</th>
                                        <th>Nom de l'écurie</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shortTeamList.map((team, index) => (
                                        <tr key={team.name} className={`text-white text-xl font-medium h-10 ${selectedTeam?.id === team.id ? "bg-[#d44444]" : ""}`}>
                                            <td className="pl-10">{index + 4}</td>
                                            <td className="pl-10">{team.name}</td>
                                            <td className="pl-10">{team.nbPoint}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                }


            </div >

        </>

    )

}



