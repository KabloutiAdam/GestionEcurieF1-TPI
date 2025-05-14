import { useAuth } from "../authProvider";
import type { driverInterface } from "../interfaces";

type Props = {
    driver: driverInterface;
    onEdit: (driver: driverInterface) => void;
}

export default function DriverCard({ driver, onEdit }: Props) {

    const {currentUser} = useAuth();

    

    return (
        <>
            <div className=" h-80 w-70  grid grid-rows-[4fr_1fr_2fr] grid-cols-1 bg-black rounded-2xl ">
                <div className="row-span-1 row-start-1 flex flex-row items-start justify-between ">
                    <div className="w-[70%] flex flex-row items-start justify-between">
                        <img className="rounded-2xl" src={`images/drivers/${driver.pictureLink}`} alt={`image de ${driver.firstname} ${driver.lastname}`} />
                    </div>
                    {currentUser?.role === "admin" && 
                     <div 
                        onClick={() => onEdit(driver)}
                        className="w-12 h-12 m-5 p-2 flex flex-row items-center justify-center hover:bg-slate-600 hover:cursor-pointer rounded-2xl ">
                        <img src="images/logo/editer.png" className=" invert brightness-0 w-full h-full" alt="logo édition" />
                    </div>
                        
                    }
                   
                </div>
                <div className="w-full row-span-1 row-start-2 flex items-center justify-start ">
                    <p className="ml-8 text-2xl font-bold text-white">{driver.firstname} {driver.lastname}</p>
                </div>
                <div className="row-span-1 row-start-3 ">
                    <div className="flex justify-around items-center text-white ">
                        <img className=" rounded-2xl" src={`images/pays/${driver.countryFlag}`} alt="" />
                        <p className="text-4xl font-bold text-white">{driver.rating}</p>
                    </div>
                </div>
            </div>


        </>
    )
}

