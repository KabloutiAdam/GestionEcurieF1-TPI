import { useEffect, useState } from "react";
import Background from "../../components/background";
import NavBar from "../../components/navBar/navBar";
import axios from "axios";
import type { driverInterface } from "../../interfaces";
import DriverCard from "../../components/driverCard";
import { useAuth } from "../../authProvider";
import AddDriverForm from "../../components/addForms/addDriverForm";
import EditDriverForm from "../../components/modifyForms/modifyDriverForm";








export default function DriversPage() {

    const [driverList, setDriverList] = useState<driverInterface[]>([])
    const [isAddFormDisplayed, setIsAddFormDisplayed] = useState(false)

    const [isModifyFormDisplayed, setIsModifyFormDisplayed] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<driverInterface | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null)
    const { authToken } = useAuth();

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
        if (authToken) {
            try {
                const decoded = JSON.parse(atob(authToken.split('.')[1]));
                setUserRole(decoded.role);
            } catch (e) {
                console.error("Erreur lors du décodage du token :", e);
            }
        }
    }, [authToken]);



    const handleEditDriver = (driver: driverInterface) => {
        setSelectedDriver(driver);
        setIsModifyFormDisplayed(true);
    };

    const addDriver = () => {
        setIsAddFormDisplayed(true)
    }



    return (
        <>
            <Background>
                <NavBar activeTab="drivers" />

                {userRole === "admin" &&
                    <>
                        <AddDriverForm isDisplayed={isAddFormDisplayed} />
                        <EditDriverForm isDisplayed={isModifyFormDisplayed} driver={selectedDriver} />
                    </>
                }
                {(isAddFormDisplayed || isModifyFormDisplayed) && (
                    <div className="fixed inset-0 z-40  bg-opacity-40 backdrop-blur-sm flex justify-center items-start pt-20 duration-500"
                        onClick={() => { setIsAddFormDisplayed(false); setIsModifyFormDisplayed(false) }}>
                    </div>
                )}



                <main className="pt-10 w-full h-screen flex justify-center flex-col items-center">
                     <a href="/mainPage" className="w-[80%] text-xl italic font-bold text-white text-start underline mt-20">Retourner au menu principal</a>
                    <div className="h-20 w-full display-flex justify-center items-center mt-20 grid grid-cols-[1fr_2fr_1fr]">
                        <p className="col-start-2 col-span-1 text-7xl font-bold text-center text-white">PILOTES</p>
                        {userRole === "admin" &&
                            <div className="w-full h-auto flex justify-end">
                                <div onClick={addDriver} className="col-span-1 col-start-3 h-10 w-fit p-4 flex justify-center items-center rounded-2xl bg-red-600 mr-10 hover:shadow-xl hover:scale-110 duration-300 bg-opacity-50 transition-all hover:cursor-pointer">
                                    <p className="text-xl font-bold text-center text-white">Ajouter un pilote</p>
                                </div>
                            </div>
                        }


                    </div>
                    <div className="drivers-container w-[90%] h-[80%] mt-20 flex flex-wrap justify-around  overflow-y-scroll ">
                        {driverList.map((driver) => (
                            <>
                                <div className="w-fit h-fit border-2 rounded-2xl border-red-700 mr-5 mt-10 ml-5 mb-30 duration-150 hover:scale-110 hover:cursor-pointer">
                                    <DriverCard driver={driver} onEdit={handleEditDriver} />
                                </div>
                            </>
                        ))}
                    </div>
                </main>
            </Background>

        </>
    )
}