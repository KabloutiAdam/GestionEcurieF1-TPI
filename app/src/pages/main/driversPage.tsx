import { useEffect, useState } from "react";
import Background from "../../components/background";
import NavBar from "../../components/navBar/navBar";
import axios from "axios";
import type { driverInterface } from "../../interfaces";
import DriverCard from "../../components/driverCard";








export default function DriversPage() {

    const [driverList, setDriverList] = useState<driverInterface[]>([])

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                
                
                const res = await axios.get("/api/drivers/")
                    
                console.log(res.data)
                setDriverList(res.data)
    
            } catch (error) {
                console.error(error)
            }
        }

        fetchDrivers()
    
    }, [])



    return (
        <>
            <Background>
                <NavBar />

                <main className="pt-25 w-full h-screen flex justify-center  items-center">
                    <div className="w-[90%] h-[80%] mt-40 flex flex-col items-center justify-center bg-black">
                        {driverList.map((driver) => (
                            <>
                                <DriverCard driver={driver}/>
                            </>
                        ))}
                    </div>
                </main>
            </Background>

        </>
    )
}