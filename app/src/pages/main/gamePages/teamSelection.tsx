import { useEffect, useState } from "react";
import Background from "../../../components/background";
import NavBar from "../../../components/navBar/navBar";
import type { teamInterface } from "../../../interfaces";
import TeamCard from "../../../components/teamCard";
import axios from "axios";
import { useGame } from "../../../context/gameContext";
import { useNavigate } from "react-router";


export default function TeamSelectionPage() {


    const [teamList, setTeamList] = useState<teamInterface[]>([])
    const { setSelectedTeam, selectedTeam } = useGame()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const res = await axios.get("/api/teams/")
                setTeamList(res.data)

            } catch (error) {
                console.error(error)
            }
        }

        fetchDrivers()

    }, [])



    const handleTeamSelect = (team: teamInterface) => {
        if(team.id == selectedTeam?.id){
            setSelectedTeam(null)
        }else{
            setSelectedTeam(team)
        }
        


    }
    const handleEditTeam = () => {


    }

    const handleNextPage = () =>{
        if(selectedTeam){
            navigate("/game/driverSelection")
        }else{
            alert("Veuillez sélectionner une équipe")
        }
    }
        
    

    return (


        <>
            <Background>
                <NavBar activeTab="none" />

                <main className="pt-25 w-full h-screen flex justify-center items-center">
                    <div className=" w-[80%] h-[80%] bg-black flex flex-col items-center justify-center ">
                        <div className="w-full mt-3 h-12 flex justify-end items-center  ">
                            <div
                                onClick={() => handleNextPage()}
                                className="w-30 h-10 mr-5 flex items-center justify-center rounded-md bg-red-600 text-white font-bold hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300">
                                Suivant
                            </div>
                        </div>
                        <div className="drivers-container w-[90%] h-[80%] mt-20 flex flex-wrap justify-around  overflow-y-scroll ">
                            {teamList.map((team) => (
                                <>

                                    <div className={`w-fit h-fit border-2 rounded-2xl  mr-5 mt-10 ml-5 mb-30 duration-50 hover:scale-110 hover:cursor-pointer ${selectedTeam === team ? "border-red-700 p-4" : "border-black p-4"}`}>
                                        <TeamCard team={team} onSelect={handleTeamSelect} onEdit={handleEditTeam} />
                                    </div>

                                </>
                            ))}
                        </div>


                    </div>
                </main>
            </Background>
        </>
    )


}
