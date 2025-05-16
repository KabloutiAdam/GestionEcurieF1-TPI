import { useEffect, useState } from "react";
import Background from "../../../components/background";
import NavBar from "../../../components/navBar/navBar";
import { useGame } from "../../../context/gameContext";
import axios from "axios";
import type { driverInterface } from "../../../interfaces";




export default function GamePage() {

    const { setGameState, gameState, selectedDrivers } = useGame()

    const [driverList, setDriverList] = useState<driverInterface[]>([])


    useEffect(() => {

        const fetchDrivers = async () => {
            try {
                const res = await axios.get("/api/drivers/")
                setDriverList(res.data)

            } catch (error) {
                console.error(error)
            }
        }

        


        fetchDrivers()
    }, [])

    const handleStart = () => {

        setGameState("inRace")
        localStorage.setItem("gameState", "inRace")
        console.log(gameState)


    }

    return (

        <>

            <Background>
                <NavBar activeTab="none" />


                <main className="pt-25 w-full h-screen flex justify-center flex-col items-center">
                    <div className=" w-[80%] h-[80%] bg-black flex flex-col items-center justify-center ">




                        {gameState == "start" &&
                            (
                                <>
                                    <div className="w-[90%] h-[70%] overflow-y-scroll ">

                                        <table className="w-full">
                                            <tbody>
                                                <tr className="text-start h-10 text-2xl italic font-bold text-white">
                                                    <th>Pos</th>
                                                    <th>Nom du pilote</th>
                                                    <th>Ecurie</th>
                                                    <th>Point gagné</th>
                                                </tr>
                                                {driverList.map(driver => {
                                                    return (
                                                        <>
                                                            <tr className={`text-start pl-10 h-10 text-2xl italic font-bold ${(driver.id == selectedDrivers[0].id || driver.id == selectedDrivers[1].id) ? "text-red-600" : "text-white"}`}>
                                                                <td className="pl-10">{driver.id}</td>
                                                                <td className="pl-10">{driver.firstname + " " + driver.lastname}</td>
                                                                <td className="pl-10">{driver.team}</td>
                                                                <td className="pl-10">{0}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })}
                                            </tbody>
                                        </table>

                                    </div>
                                    <div
                                        onClick={handleStart}
                                        className="w-90 h-15 mr-5 z-10 flex items-center justify-center rounded-md bg-red-600 text-white font-bold hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300">
                                        COMMENCER LA PREMIERE COURSE
                                    </div>
                                </>
                            )
                        }

                        {gameState == "inRace" &&
                            (
                                <>


                                </>

                            )


                        }

                    </div>
                </main>
            </Background>

        </>

    )



}



