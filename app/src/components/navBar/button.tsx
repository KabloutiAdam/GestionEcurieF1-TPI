import { Link } from "react-router-dom";

export default function Button({label, url} : {label : string, url : string}) {
    return (
        <>
            <Link to={`/${url}`}>
                <p className="text-3xl font-bold text-white hover:text-red-400">{label}</p>
            </Link>
        </>
    );
}