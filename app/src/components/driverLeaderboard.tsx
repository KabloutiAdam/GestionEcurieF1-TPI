import { useGame } from "../context/gameContext";
import type { driverInterface } from "../interfaces";


type Props = {
    isResult: boolean;
    driverList: driverInterface[] | null;
};


export default function DriverLeaderboard({ driverList, isResult }: Props) {

    const { selectedDrivers } = useGame()
    const pointDistribution = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]
    let counter = 0
    if (!driverList) return null;

    const orderedDrivers = driverList
        ? isResult
            ? [...driverList]
            : [...driverList].sort((a, b) => b.point - a.point) 
        : [];

    return (

        <>

            <div className="w-[90%] h-[70%] overflow-y-scroll ">

                <table className="w-full">
                    <tbody>
                        <tr className="text-start h-10 text-2xl italic font-bold text-white">
                            <th>Pos</th>
                            <th>Nom du pilote</th>
                            <th>Ecurie</th>
                            <th>Points gagnés</th>
                        </tr>
                        {orderedDrivers.map((driver, index) => {
                            if (driver.point == null) driver.point = 0;

                            const isUserDriver = selectedDrivers.length >= 2 &&
                                (driver.id === selectedDrivers[0].id || driver.id === selectedDrivers[1].id);

                            return (
                               <tr key={driver.firstname} className={`text-white text-xl font-medium h-10 ${isUserDriver ? "bg-[#d44444]" : ""}`}>
                                    <td className="pl-10">{index + 1}</td>
                                    <td className="pl-10">{driver.firstname + " " + driver.lastname}</td>
                                    <td className="pl-10">{driver.team}</td>
                                    <td className="pl-10">{isResult ? pointDistribution[counter++] || 0 : driver.point}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>

        </>

    )

}



