import { useEffect, useState } from "react";
import Background from "../../components/background";
import NavBar from "../../components/navBar/navBar";
import { useAuth } from "../../authProvider";
import type { trackInterface } from "../../interfaces";
import AddTrackForm from "../../components/addForms/addTrackForm";
import EditTrackForm from "../../components/modifyForms/modifyTrackForm";
import axios from "axios";
import TrackCard from "../../components/trackCard";



export default function TracksPage() {
    const [trackList, setTrackList] = useState<trackInterface[]>([])
    const [isAddFormDisplayed, setIsAddFormDisplayed] = useState(false)
    const [isModifyFormDisplayed, setIsModifyFormDisplayed] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState<trackInterface | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null)
    const { authToken } = useAuth()



    const handldeDeleteDriver = (track: trackInterface) => {

        try {
            axios.post("/api/tracks/delete", {
                param: track.id,
                order : track.trackOrder
            })
        } catch (error) {
            console.error(error)
        }


    };


    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const res = await axios.get("/api/tracks/")
                setTrackList(res.data)

            } catch (error) {
                console.error(error)
            }
        }

        fetchDrivers()

    }, [handldeDeleteDriver])

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

    const handleEditTeam = (track: trackInterface) => {
        setSelectedTrack(track);
        setIsModifyFormDisplayed(true);
    };

    const addTeam = () => {
        setIsAddFormDisplayed(true)
    }
    return (
        <>
            <Background>
                <NavBar activeTab="tracks" />
                {userRole === "admin" &&
                    <>
                        <AddTrackForm isDisplayed={isAddFormDisplayed} />
                        <EditTrackForm isDisplayed={isModifyFormDisplayed} track={selectedTrack} />
                    </>
                }
                {(isAddFormDisplayed || isModifyFormDisplayed) && (
                    <div className="fixed inset-0 z-40  bg-opacity-40 backdrop-blur-sm flex justify-center items-start pt-20 duration-500"
                        onClick={() => { setIsAddFormDisplayed(false); setIsModifyFormDisplayed(false) }}>
                    </div>
                )}


                <main className="pt-10 w-full h-screen flex justify-center flex-col items-center">
                    <a href="/mainPage" className="w-[80%] text-xl italic font-bold text-white text-start underline mt-20">Retourner au menu principal</a>
                    <div className="h-10 w-full display-flex justify-center items-center mt-20 grid grid-cols-[1fr_2fr_1fr]">
                        <p className="col-start-2 col-span-1 text-7xl font-bold text-center text-white">CIRCUITS</p>
                        {userRole === "admin" &&
                            <div className="w-full h-auto flex justify-end">
                                <div onClick={addTeam} className="col-span-1 col-start-3 h-10 w-fit p-4 flex justify-center items-center rounded-2xl bg-red-600 mr-10 hover:shadow-xl hover:scale-110 duration-300 bg-opacity-50 transition-all hover:cursor-pointer">
                                    <p className="text-xl font-bold text-center text-white">Ajouter un circuit</p>
                                </div>
                            </div>
                        }


                    </div>
                    <div className="drivers-container w-[90%] h-[80%] mt-20 flex flex-wrap justify-around  overflow-y-scroll ">
                        {trackList.map((track) => (
                            <>

                                <div className="w-fit h-fit border-2 rounded-2xl border-red-700 mr-5 mt-10 ml-5 mb-30 duration-150 hover:scale-110 hover:cursor-pointer">
                                    <TrackCard track={track} onEdit={handleEditTeam} onDelete={handldeDeleteDriver}/>
                                </div>

                            </>
                        ))}
                    </div>
                </main>
            </Background>

        </>


    )


}