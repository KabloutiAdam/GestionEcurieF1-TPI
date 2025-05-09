import type { driverInterface } from "../interfaces";

type Props = {
    driver: driverInterface;
}

export default function DriverCard({driver} : Props) {
    return (
        <div className="driver-card">
            <p>{driver.firstname}</p>
        </div>
    )
}

