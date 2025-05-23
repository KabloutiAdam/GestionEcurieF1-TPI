import { useEffect, useState } from "react";
import Background from "../../../components/background";
import NavBar from "../../../components/navBar/navBar";
import axios from "axios";
import type { driverInterface } from "../../../interfaces";
import DriverCard from "../../../components/driverCard";
import { useGame } from "../../../context/gameContext";








export default function DriverSelection() {

    const [driverList, setDriverList] = useState<driverInterface[]>([])




    
    const { selectedDrivers, setSelectedDrivers, selectedTeam, startSeason} = useGame()

    
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


    useEffect(() => {
        console.log(selectedTeam)
        console.log(selectedDrivers)
    }, [selectedDrivers])

    const handleEditDriver = () => {                                                                                     

    };
    const handldeDeleteDriver  = () => {                                                                                     

    };

    const handleDriverSelection = (driver: driverInterface) => {

        //FIFO
        setSelectedDrivers((prev) => {
            if (prev.find(d => d.id === driver.id)) {
                return prev.filter(d => d.id !== driver.id);
            }
            if (prev.length < 2) {
                return [...prev, driver];
            }
            return [prev[1], driver];
        });
    };



    const handleNextPage = () => {
        if(selectedDrivers.length === 2) {
            setSelectedDrivers([])
            startSeason()
        }
        else{
            alert("Veuillez selectionner 2 pilotes")
        }
    }
        
    


    return (
        <>
            <Background>
                <NavBar activeTab="none" />


                <main className="pt-25 w-full h-screen flex justify-center flex-col items-center">
                    <div className=" w-[80%] h-[80%] bg-black flex flex-col items-center justify-center ">
                        <div className="w-full mt-3 h-12 flex justify-end items-center  ">
                            <div
                                onClick={handleNextPage}
                                className="w-30 h-10 mr-5 z-10 flex items-center justify-center rounded-md bg-red-600 text-white font-bold hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300">
                                Suivant
                            </div>
                        </div>

                        <div className="drivers-container w-[90%] h-[80%] pt-5 mt-20 flex flex-wrap justify-around  overflow-y-scroll ">
                            {driverList.map((driver) => (
                                <>
                                    <div className={`w-fit h-fit z-1 border-2 rounded-2xl duration-150 hover:scale-110 hover:cursor-pointer  ${selectedDrivers.some(d => d.id === driver.id) ? "border-red-700 p-4" : "border-black p-4"}`} >
                                        <DriverCard driver={driver} onEdit={handleEditDriver} onSelect={handleDriverSelection} onDelete={handldeDeleteDriver} />
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