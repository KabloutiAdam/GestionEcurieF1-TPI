import axios from "axios";
import { useEffect, useState } from "react";
import type { country, driverInterface, teamInterface } from "../../interfaces";

type Props = {
    team: teamInterface | null;
    isDisplayed: boolean
}

export default function EditTeamForm({ isDisplayed, team }: Props) {

    const [isAddFormDisplayed, setIsAddFormDisplayed] = useState(isDisplayed)
    const [name, setName] = useState(team?.name || "")
    const [query, setQuery] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

 


    useEffect(() => {
        setIsAddFormDisplayed(isDisplayed)
       
    }, [isDisplayed])

    useEffect(() => {
        if (team) {
            setName(team.name);
            

        }
    }, [team]);

  

    
   

    const handleTeamSubmit = () => {
        if (name.length > 0) {
            axios.put("/api/teams/update", {
                idTeam: team?.id,
                name
                
            }).then(() => {
                alert("Ecurie modifié avec succès")
                window.location.reload();
            })
        } else {
            setErrorMessage("Veuillez remplir tous les champs obligatoires (*)")
        }
    }


     return (
        <>
            <div className={`fixed top-[-200px] left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-in-out ${isAddFormDisplayed ? 'translate-y-1/2 opacity-100' : '-translate-y-full opacity-0'}  bg-white w-[400px] h-[700px] rounded-xl shadow-xl z-50`}>
                <div className="w-full h-full grid grid-rows-[1fr_5fr_1fr] grid-cols-1">
                    <div className="row-span-1 row-start-1 ">
                        <p className="text-2xl font-bold text-center pt-10">Ajout d'écurie</p>
                    </div>
                    <div className="row-span-1 row-start-2 flex flex-col gap-2 justify-center">
                        <div className="flex flex-col mb-6">
                            <label htmlFor="firstname" className="justify-self-start ml-2 mb-2">Nom de l'écurie *</label>
                            <input
                                className={`w-[70%] border-b-2 ml-5  focus:outline-none py-2 px-3 placeholder:italic ${name.length == 0 ? "border-red-500" : "border-black"}`}
                                id="name"
                                type="text"
                                value={name}
                                placeholder="Mercedes"
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={
                                    (e) => {
                                        if (e.key === "Enter") {
                                            alert()
                                        }
                                    }
                                }
                            />
                        </div>
                       
                        <div className="flex flex-col mb-6">
                            <label htmlFor="image" className="justify-self-start ml-2 mb-2">Logo de l'écurie</label>
                            <input
                                className="  w-[80%] border-black border-2 py-2 px-3 ml-5 hover:bg-red-300 hover:cursor-pointer"
                                type="file"
                                name="image"
                                id="image" />

                        </div>
                    </div>
                    <div className="row-span-1 row-start-3 ">
                        <p className="text-red-600 text-center mb-5 font-bold min-h-[1.5rem]">{errorMessage}</p>
                        <div className="h-fit w-full row-start-5 flex flex-row justify-center">
                            <button
                                className="w-30 h-10 rounded-md bg-red-600 text-white font-bold hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300"

                                onClick={handleTeamSubmit}>Valider</button>
                        </div>
                    </div>



                </div>
            </div>

        </>
    );
}