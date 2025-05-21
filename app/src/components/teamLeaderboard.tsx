import { useEffect, useMemo, useState } from "react";
import type { driverInterface, teamInterface } from "../interfaces";
import axios from "axios";
import { useGame } from "../context/gameContext";

type Props = {
    driverList: driverInterface[] | null;
};

export default function TeamLeaderboard({ driverList }: Props) {

    const [teamList, setTeamList] = useState<teamInterface[] | null>(null);
    const {selectedTeam} = useGame()

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

    return (
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
                    {computedTeamList.map((team, index) => (
                        <tr key={team.name} className={`text-white text-xl font-medium h-10 ${selectedTeam?.id === team.id ? "bg-[#d44444]" : ""}`}>
                            <td className="pl-10">{index + 1}</td>
                            <td className="pl-10">{team.name}</td>
                            <td className="pl-10">{team.nbPoint}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
