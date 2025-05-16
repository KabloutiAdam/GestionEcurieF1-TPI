import { useEffect, useState } from "react";
import Background from "../../../components/background";
import NavBar from "../../../components/navBar/navBar";
import { useGame } from "../../../context/gameContext";
import axios from "axios";
import { type driverInterface, type trackInterface } from "../../../interfaces";




export default function GamePage() {

    const { setGameState, gameState, selectedDrivers, trackOrder } = useGame()

    const [driverList, setDriverList] = useState<driverInterface[]>([])
    const [trackList, setTrackList] = useState<trackInterface[]>([])
    const [loadingValue, setLoadingValue] = useState<number>(0)


    useEffect(() => {

        const fetchDrivers = async () => {
            try {
                const res = await axios.get("/api/drivers/")
                setDriverList(res.data)

            } catch (error) {
                console.error(error)
            }
        }

        const fetchTracks = async () => {
            try {
                const res = await axios.get("/api/tracks/")
                setTrackList(res.data)

            } catch (error) {
                console.error(error)
            }
        }





        fetchTracks()
        fetchDrivers()
    }, [])

    const handleStart = () => {


        const settings = localStorage.getItem("gameSettings")
        if (settings) {
            const parsed = JSON.parse(settings)
            const newSettings = [parsed[0], parsed[1], 1]
            console.log(parsed)
            localStorage.setItem("gameSettings", JSON.stringify(newSettings))
        }

        loadingRace()

        

        setGameState("inRace")

        localStorage.setItem("gameState", "inRace")
        console.log(gameState)
    }

    const loadingRace = async() => {
        let i = 0;
        const interval = setInterval(() => {
            setLoadingValue(i); 
            i++;
            if (i > 300) {
                clearInterval(interval);
            }
        }, 20);
    };

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

                        {gameState === "inRace" && trackList.length >= trackOrder && trackList[trackOrder - 1] &&
                            (
                                <>
                                    <div className="w-[90%] h-[70%] flex flex-col items-center " >
                                        <div className="w-full h-100 flex flex-col items-center justify-center ">
                                            <img
                                                className="w-130"
                                                src={`/images/tracks/${trackList[trackOrder - 1].pictureLink}`} alt="" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-white">
                                                {trackList[trackOrder - 1].name}
                                            </p>



                                        </div>

                                        <div className="h-8 bg-gray-300 w-full rounded-md overflow-hidden">
                                            <div
                                                className="h-full bg-red-500 transition-all duration-300"
                                                style={{ width: `${loadingValue/3}%` }}
                                            />
                                        </div>

                                    </div>

                                </>

                            )


                        }

                    </div>
                </main>
            </Background>

        </>

    )



}



