import { act, useEffect, useState } from "react";
import Background from "../../../components/background";
import NavBar from "../../../components/navBar/navBar";
import { useGame } from "../../../context/gameContext";
import axios from "axios";
import { type driverInterface, type trackInterface } from "../../../interfaces";
import DriverLeaderboard from "../../../components/driverLeaderboard";
import TeamLeadearboard from "../../../components/teamLeaderboard";
import FinalLeaderBoard from "../../../components/finalLeaderBoard";
import { useNavigate } from "react-router";




export default function GamePage() {

    const { setGameState, gameState, selectedDrivers, dnfDriver, raceResult, trackOrder, raceSimulation } = useGame()
    const [isLoading, setIsLoading] = useState(true)
    const [driverList, setDriverList] = useState<driverInterface[]>([])
    const [trackList, setTrackList] = useState<trackInterface[]>([])
    const [loadingValue, setLoadingValue] = useState<number>(0)
    const [activeTab, setActiveTab] = useState("drivers")
    const navigate = useNavigate()

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


    useEffect(() => {

        const fetchDrivers = async () => {
            try {
                const res = await axios.get("/api/drivers/")
                setDriverList(res.data)
                return res.data;

            } catch (error) {
                console.error(error)
                return [];
            }
        }

        const fetchTracks = async () => {
            try {
                const res = await axios.get("/api/tracks/")
                setTrackList(res.data)
                return res.data;
            } catch (error) {
                console.error(error)
                return [];
            }
        }



        const loadAllData = async () => {
            const [drivers, tracks] = await Promise.all([fetchDrivers(), fetchTracks()]);

            if (drivers.length && tracks.length) {
                setIsLoading(false);
            }
        };
        
        loadAllData();

        setActiveTab("drivers")
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


    const handleDriverTab = () => {
        setActiveTab("drivers")
    }

    const backToMenu = () =>{
        localStorage.removeItem("gameSettings")
        localStorage.removeItem("gameState")
        localStorage.removeItem("inGame")
        localStorage.removeItem("raceResult")
        navigate("/mainMenu")
    }

    const handleTeamTab = () => {
        setActiveTab("teams")
    }

    const goToleaderboard = () => {
        setGameState("leaderboard")
        localStorage.setItem("gameState", "leaderboard")



    }

    const handleNextRace = async () => {


        setGameState("inRace")

        localStorage.setItem("gameState", "inRace")

        setLoadingValue(0)
        const settings = localStorage.getItem("gameSettings")
        if (settings) {
            const parsed = JSON.parse(settings)
            const newSettings = [parsed[0], parsed[1], parsed[2] + 1]
            console.log(parsed)
            localStorage.setItem("gameSettings", JSON.stringify(newSettings))
        }

        raceSimulation()
        await loadingRace()

        setGameState("endRace")
        localStorage.setItem("gameState", "endRace")

    }

    const handleEndSeason = () => {
        setGameState("endSeason")
        localStorage.setItem("gameState", "endSeason")

    }


    const loadingRace = async () => {
        console.log(trackOrder)
        for (let i = 0; i <= 300; i++) {
            setLoadingValue(i);
            await wait(20);
        }

    };

    if (isLoading) {
        return (
            <Background>
                <NavBar activeTab="none" />
                <main className="w-full h-screen flex justify-center items-center">
                    <div className="text-white text-2xl font-bold ">
                        Chargement en cours...
                    </div>
                </main>
            </Background>
        );
    }

    return (

        <>

            <Background>
                <NavBar activeTab="none" />


                <main className="pt-25 w-full h-screen flex justify-center flex-col items-center">
                    <div className=" w-[80%] h-[90%] bg-black flex flex-col items-center justify-center ">




                        {gameState == "start" &&
                            (
                                <>

                                    <DriverLeaderboard driverList={driverList} isResult={false} />
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

                                    <div className="col-start-1 col-span-1 h-full grid-cols-1 grid grid-rows-[1fr_1fr_1fr]">
                                        <div className="h-full w-full flex items-center justify-center ">
                                            <div className="row-span-1 row-start-1 flex flex-col justify-center items-center p-5 rounded-2xl bg-[#191919]">

                                                <div className="flex flex-row justify-center items-center h-full">
                                                    <img
                                                        className="w-40"
                                                        src={`/images/tracks/${trackList[trackOrder - 1].pictureLink}`} alt="" />
                                                    <div className="flex flex-row justify-center items-center w-full h-auto">
                                                        <div className="w-full h-full flex justify-end items-start">
                                                            <img
                                                                className="w-15"
                                                                src={`/images/pays/${trackList[trackOrder - 1].trackCountryPicture}`} alt="" />

                                                        </div>

                                                    </div>
                                                </div>


                                                <div className="flex flex-row justify-center items-center  h-full">
                                                    <p className="text-l font-bold text-center text-white">
                                                        {trackList[trackOrder - 1].name}
                                                    </p>


                                                </div>


                                            </div>
                                        </div>

                                        <div className="row-span-1 row-start-2 flex flex-col justify-center items-center  h-full">
                                            <div className="w-full h-full flex flex-col justify-evenly items-center">
                                                <p className="text-xl font-bold text-white">Liste des abandons</p>
                                                <div className="w-[80%] h-[80%] p-5 rounded-2xl bg-[#191919]">
                                                    <ul>
                                                        {dnfDriver?.map((driver) => {


                                                            const isUserDriver = selectedDrivers.length >= 2 &&
                                                                (driver.id === selectedDrivers[0].id || driver.id === selectedDrivers[1].id);
                                                            return (
                                                                <>
                                                                    <li className={`text-l  ${isUserDriver ? "text-red-600" : "text-white "}`}>{driver.firstname} {driver.lastname} </li>
                                                                </>
                                                            )
                                                        }
                                                        )}
                                                    </ul>

                                                </div>
                                            </div>

                                        </div>
                                        {trackList[trackOrder] && (
                                            <div className="h-full w-full flex items-center flex-col justify-center ">
                                                <p className="text-xl font-bold text-white">Prochaine Course</p>
                                                <div className="row-span-1 row-start-1 flex flex-col justify-center items-center p-5 rounded-2xl bg-[#191919]">
                                                    <div className="flex flex-row justify-center items-center h-full">
                                                        <img
                                                            className="w-40"
                                                            src={`/images/tracks/${trackList[trackOrder].pictureLink}`} alt="" />
                                                        <div className="flex flex-row justify-center items-center w-full h-auto">
                                                            <div className="w-full h-full flex justify-end items-start">
                                                                <img
                                                                    className="w-15"
                                                                    src={`/images/pays/${trackList[trackOrder].trackCountryPicture}`} alt="" />

                                                            </div>

                                                        </div>
                                                    </div>


                                                    <div className="flex flex-row justify-center items-center  h-full">
                                                        <p className="text-l text-center font-bold text-white">
                                                            {trackList[trackOrder].name}
                                                        </p>


                                                    </div>

                                                </div>
                                            </div>
                                        )}

                                    </div>
                                    <div className="col-span-1 mt-14 col-start-2 h-full overflow-auto flex flex-col justify-center items-center">
                                        <DriverLeaderboard driverList={raceResult} isResult={true} />
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

                                    <div className="col-start-1 col-span-1 h-full grid-cols-1 grid grid-rows-[1fr_1fr_1fr]">
                                        <div className="h-full w-full flex items-center justify-center ">
                                            <div className="row-span-1 row-start-1 flex flex-col justify-center items-center p-5 rounded-2xl bg-[#191919]">

                                                <div className="flex flex-row justify-center items-center h-full">
                                                    <img
                                                        className="w-40"
                                                        src={`/images/tracks/${trackList[trackOrder - 1].pictureLink}`} alt="" />
                                                    <div className="flex flex-row justify-center items-center w-full h-auto">
                                                        <div className="w-full h-full flex justify-end items-start">
                                                            <img
                                                                className="w-15"
                                                                src={`/images/pays/${trackList[trackOrder - 1].trackCountryPicture}`} alt="" />

                                                        </div>

                                                    </div>
                                                </div>


                                                <div className="flex flex-row justify-center items-center h-full">
                                                    <p className="text-l font-bold text-center text-white">
                                                        {trackList[trackOrder - 1].name}
                                                    </p>


                                                </div>


                                            </div>
                                        </div>

                                        
                                        {trackList[trackOrder] && (
                                            <div className="h-full w-full flex items-center flex-col justify-center">
                                                <p className="text-xl font-bold text-white">Prochaine Course</p>
                                                <div className="row-span-1 row-start-1 flex flex-col justify-center items-center p-5 rounded-2xl bg-[#191919]">
                                                    <div className="flex flex-row justify-center items-center h-full">
                                                        <img
                                                            className="w-40"
                                                            src={`/images/tracks/${trackList[trackOrder].pictureLink}`} alt="" />
                                                        <div className="flex flex-row justify-center items-center w-full h-auto">
                                                            <div className="w-full h-full flex justify-end items-start">
                                                                <img
                                                                    className="w-15"
                                                                    src={`/images/pays/${trackList[trackOrder].trackCountryPicture}`} alt="" />

                                                            </div>

                                                        </div>
                                                    </div>


                                                    <div className="flex flex-row justify-center items-center  h-full">
                                                        <p className="text-l font-bold text-center text-white">
                                                            {trackList[trackOrder].name}
                                                        </p>


                                                    </div>

                                                </div>
                                            </div>
                                        )}

                                    </div>
                                    <div className="col-span-1 col-start-2 h-full overflow-auto flex flex-col justify-between items-center">
                                        <div className="h-14 w-full flex flex-row ">
                                            <div
                                                onClick={handleDriverTab}
                                                className={`w-[50%] h-full flex flex-row justify-center items-center duration-100 hover:cursor-pointer rounded-tr-[40px] ${activeTab == "drivers" ? "bg-red-700" : "bg-[#474747]"}`}>
                                                <p className="text-xl font-bold text-white">Classement des pilotes</p>
                                            </div>
                                            <div
                                                onClick={handleTeamTab}
                                                className={`w-[50%] h-full flex flex-row justify-center items-center duration-100 hover:cursor-pointer rounded-tl-[40px] ${activeTab == "teams" ? "bg-red-700" : "bg-[#474747]"}`}>
                                                <p className="text-xl font-bold text-white">Classement des constructeurs</p>
                                            </div>
                                        </div>
                                        {activeTab == "drivers" && (
                                            <DriverLeaderboard driverList={driverList} isResult={false} />
                                        )}
                                        {activeTab == "teams" && (
                                            <TeamLeadearboard driverList={driverList} />
                                        )}

                                        <div
                                            onClick={trackOrder == trackList.length ? handleEndSeason : handleNextRace}
                                            className="w-90 h-15 mr-5 mt-4 z-10 flex items-center justify-center rounded-md bg-red-600 text-white font-bold hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300"
                                        >
                                            Passer à la prochaine course
                                        </div>
                                    </div>
                                </div>

                            </>
                        )}

                        {gameState == "endSeason" && (

                            <>
                                <div className="w-full flex items-center justify-center">
                                    <p className="text-4xl w-full font-bold text-white text-center mb-4"> CLASSEMENT FINAL</p>
                                </div>

                                <div className="h-14 w-full flex flex-row ">
                                    <div
                                        onClick={handleDriverTab}
                                        className={`w-[50%] h-full flex flex-row justify-center items-center duration-100 hover:cursor-pointer rounded-tr-[40px] ${activeTab == "drivers" ? "bg-red-700" : "bg-[#474747]"}`}>
                                        <p className="text-xl font-bold text-white">Classement des pilotes</p>
                                    </div>
                                    <div
                                        onClick={handleTeamTab}
                                        className={`w-[50%] h-full flex flex-row justify-center items-center duration-100 hover:cursor-pointer rounded-tl-[40px] ${activeTab == "teams" ? "bg-red-700" : "bg-[#474747]"}`}>
                                        <p className="text-xl font-bold text-white">Classement des constructeurs</p>
                                    </div>
                                </div>
                                <FinalLeaderBoard driverList={driverList} isResult={false} isDriver={activeTab == "drivers"} />
                                <div
                                    onClick={backToMenu}
                                    className="w-90 h-15 mr-5 mt-4 z-10 flex items-center justify-center rounded-md bg-red-600 text-white font-bold hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300"
                                >
                                    Retour au menu principal
                                </div>
                            </>
                        )}

                    </div>
                </main>
            </Background>

        </>

    )



}



