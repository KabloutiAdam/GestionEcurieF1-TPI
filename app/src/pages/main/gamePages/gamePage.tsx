import { useEffect, useState } from "react";
import Background from "../../../components/background";
import NavBar from "../../../components/navBar/navBar";
import { useGame } from "../../../context/gameContext";
import axios from "axios";
import { type driverInterface, type trackInterface } from "../../../interfaces";
import Leaderboard from "../../../components/leaderboard";




export default function GamePage() {

    const { setGameState, gameState, selectedDrivers, raceResult, trackOrder, raceSimulation } = useGame()

    const [driverList, setDriverList] = useState<driverInterface[]>([])
    const [trackList, setTrackList] = useState<trackInterface[]>([])
    const [loadingValue, setLoadingValue] = useState<number>(0)

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


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
    }, [gameState])

    const handleStart = async () => {




        const settings = localStorage.getItem("gameSettings")
        if (settings) {
            const parsed = JSON.parse(settings)
            const newSettings = [parsed[0], parsed[1], 1]
            console.log(parsed)
            localStorage.setItem("gameSettings", JSON.stringify(newSettings))
        }





        setGameState("inRace")

        localStorage.setItem("gameState", "inRace")


        raceSimulation()
        await loadingRace()

        setGameState("endRace")
        localStorage.setItem("gameState", "endRace")
    }

    const goToleaderboard = () => {
        setGameState("leaderboard")
        localStorage.setItem("gameState", "leaderboard")


    }

    const loadingRace = async () => {
        for (let i = 0; i <= 300; i++) {
            setLoadingValue(i);
            await wait(20);
        }
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

                                    <Leaderboard driverList={driverList} isResult={false} />
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
                                                style={{ width: `${loadingValue / 3}%` }}
                                            />
                                        </div>

                                    </div>

                                </>

                            )


                        }

                        {gameState == "endRace" && (

                            <>
                                <div className="w-full flex items-center justify-center">
                                    <p className="text-4xl w-full font-bold text-white text-center mt-7 mb-4"> Résultat de la course</p>
                                </div>
                                <div className="grid grid-cols-[2fr_7fr] w-full h-full overflow-hidden">

                                    <div className="col-start-1 col-span-1  h-full grid-cols-1 grid grid-rows-3">

                                        <div className="row-span-1 row-start-1 flex flex-col justify-center items-center ">
                                            <img
                                                className="w-50"
                                                src={`/images/tracks/${trackList[trackOrder - 1].pictureLink}`} alt="" />
                                            <div className="flex flex-row justify-center items-center  h-full">
                                                <p className="text-2xl font-bold text-white">
                                                    {trackList[trackOrder - 1].name}
                                                </p>
                                                {/* <img
                                                    className="w-10"
                                                    src={`/images/country/${trackList[trackOrder - 1].pictureLink}`} alt="" /> */}

                                            </div>


                                        </div>
                                        <div className="row-span-1 row-start-2 flex bg-blue-300 flex-col justify-center items-center  h-full">


                                        </div>
                                        <div className="row-span-1 row-start-3 flex bg-green-300 flex-col justify-center items-center  h-full">
                                            <img
                                                className="w-50"
                                                src={`/images/tracks/${trackList[trackOrder].pictureLink}`} alt="" />
                                            <div className="flex flex-row justify-center items-center  h-full">
                                                <p className="text-2xl font-bold text-white">
                                                    {trackList[trackOrder - 0].name}
                                                </p>
                                                {/* <img
                                                    className="w-10"
                                                    src={`/images/country/${trackList[trackOrder - 1].pictureLink}`} alt="" /> */}

                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-span-1 col-start-2 bg-amber-500 h-full overflow-auto flex flex-col justify-center items-center">
                                        <Leaderboard driverList={raceResult} isResult={true} />
                                        <div
                                            onClick={goToleaderboard}
                                            className="w-90 h-15 mr-5 mt-4 z-10 flex items-center justify-center rounded-md bg-red-600 text-white font-bold hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300"
                                        >
                                            Voir les classements
                                        </div>
                                    </div>
                                </div>



                            </>
                        )
                        }

                        {gameState == "leaderboard" && (

                            <>
                                <div className="w-full flex items-center justify-center">
                                    <p className="text-4xl w-full font-bold text-white text-center mt-7 mb-4"> CLASSEMENTS</p>
                                </div>
                                <div className="grid grid-cols-[2fr_7fr] w-full h-full overflow-hidden">

                                    <div className="col-start-1 col-span-1 bg-red-500 h-full overflow-auto">

                                    </div>
                                    <div className="col-span-1 col-start-2 bg-amber-500 h-full overflow-auto flex flex-col justify-center items-center">
                                        <Leaderboard driverList={raceResult} isResult={false} />
                                        <div
                                            onClick={handleStart}
                                            className="w-90 h-15 mr-5 mt-4 z-10 flex items-center justify-center rounded-md bg-red-600 text-white font-bold hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300"
                                        >
                                            Voir les classements
                                        </div>
                                    </div>
                                </div>

                            </>
                        )}

                    </div>
                </main>
            </Background>

        </>

    )



}



