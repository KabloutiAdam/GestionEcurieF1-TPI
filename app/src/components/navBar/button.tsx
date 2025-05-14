import { Link } from "react-router-dom";

export default function Button({label, url, isActive} : {label : string, url : string, isActive : boolean}) {
    
    return (
        <>
            <Link to={`/${url}`}>
                <p className={`text-3xl font-bold  hover:text-red-400 ${isActive ? "text-red-700" : "text-white"}`}>{label}</p>
            </Link>
        </>
    );
}