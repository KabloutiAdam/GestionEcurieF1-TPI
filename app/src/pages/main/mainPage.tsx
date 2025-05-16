
import { useNavigate } from "react-router"
import Background from "../../components/background"
import NavBar from "../../components/navBar/navBar"
import { useEffect, useState } from "react"
import type { driverInterface } from "../../interfaces"
import axios from "axios"



export default function MainPage() {
    
    const navigate = useNavigate()
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
    },[])

    const handleNewGameClick = async() =>{

           for (let i = 0; i < driverList.length; i++) {
            driverList[i].point = 0
            await axios.put('/api/drivers/updatePoints',
                {
                    idDriver: driverList[i].id,
                    points: driverList[i].point
                }
            )
        }
        localStorage.setItem("inGame", "true")
        navigate("/game/teamSelection")

    }

    return (

        <>
            <Background>
                <NavBar activeTab="none" />

                <main className="pt-25 w-full h-screen flex justify-center items-center">
                    <button
                        onClick={handleNewGameClick}
                        className=" bg-red-600 hover:bg-red-700 hover:cursor-pointer focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-white text-2xl px-10 py-3 rounded-xl font-bold"
                        
                    >Commencer une saison</button>
                </main>
            </Background>
        </>


    )


}
