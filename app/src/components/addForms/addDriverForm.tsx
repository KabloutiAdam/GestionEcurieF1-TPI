import axios from "axios";
import { useEffect, useState } from "react";
import type { country } from "../../interfaces";

export default function AddDriverForm({ isDisplayed }: { isDisplayed: boolean }) {

    const [isAddFormDisplayed, setIsAddFormDisplayed] = useState(isDisplayed)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [rating, setRating] = useState("")
    const [query, setQuery] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [isNationalityDropdownDisplayed, setIsNationalityDropdownDisplayed] = useState<boolean>(false);
    const [countryList, setCountryList] = useState<country[]>([])
    const [nationalitySelected, setNationalitySelected] = useState<country>()
    

    useEffect(() => {
        setIsAddFormDisplayed(isDisplayed)

    }, [isDisplayed])

    useEffect(() => {
        const fetchFilteredCountries = async () => {

            if (query.length > 0) {
                try {
                    const res = await axios.get("/api/country", {
                        params: { query },
                    })

                    setCountryList(res.data)
                    if (res.data.length > 0) {
                        //setnoresult
                    }
                } catch (error) {
                    console.error("Erreur lors de la recherche :", error);
                    // set no result
                }


            } else {
                const res = await axios.get("/api/country");
                setCountryList(res.data)
                if (res.data.length > 0) {
                    //set no result
                }
            }


        }

        fetchFilteredCountries()

    }, [query])

    const handleInputChange = (event: any) => {
        setQuery(event.target.value);
        setNationalitySelected(event.target.value);

    };

    const handleDriverSubmit = () =>{
        if(nationalitySelected && lastname.length > 0 && firstname.length > 0 && rating.length > 0){
            axios.post("/api/drivers/add", {
                firstname,
                lastname,
                rating,
                nationality: nationalitySelected?.id
            }).then(() => {
                alert("Pilote ajouté avec succès")
            })
        }else{
            setErrorMessage("Veuillez remplir tous les champs obligatoires (*)")
        }
    }


    return (
        <>
            <div className={`fixed top-[-200px] left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-in-out ${isAddFormDisplayed ? 'translate-y-1/2 opacity-100' : '-translate-y-full opacity-0'}  bg-white w-[400px] h-[700px] rounded-xl shadow-xl z-50`}>
                <div className="w-full h-full grid grid-rows-[1fr_5fr_1fr] grid-cols-1">
                    <div className="row-span-1 row-start-1 ">
                        <p className="text-2xl font-bold text-center pt-10">Ajout de pilote</p>
                    </div>
                    <div className="row-span-1 row-start-2 ">
                        <div className="flex flex-col mb-6">
                            <label htmlFor="firstname" className="justify-self-start ml-2 mb-2">Prénom du pilote *</label>
                            <input
                                className={`w-[70%] border-b-2 ml-5  focus:outline-none py-2 px-3 placeholder:italic ${firstname.length == 0 ? "border-red-500" : "border-black"}`}
                                id="firstname"
                                type="text"
                                value={firstname}
                                placeholder="Max"
                                onChange={(e) => setFirstname(e.target.value)}
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
                            <label htmlFor="rating" className="justify-self-start ml-2 mb-2">Nom du pilote *</label>
                            <input
                                className={`w-[70%] border-b-2 ml-5  focus:outline-none py-2 px-3 placeholder:italic ${lastname.length == 0 ? "border-red-500" : "border-black"}`}
                                id="lastname"
                                type="text"
                                value={lastname}
                                placeholder="Verstappen"
                                onChange={(e) => setLastname(e.target.value)}
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
                            <label htmlFor="rating" className="justify-self-start ml-2 mb-2">Rating du pilote *</label>
                            <input
                                className={`ratingInput w-[20%] border-b-2 ml-5  focus:outline-none py-2 px-3 placeholder:italic ${rating.length == 0 ? "border-red-500" : "border-black"}`}
                                id="rating"
                                type="number"
                                min={0}
                                max={100}
                                value={rating}
                                placeholder="98"
                                onChange={(e) => setRating(e.target.value)}
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


                            <label htmlFor="nationality" className="justify-self-start ml-2 mb-2">Nationnalité du pilote *</label>

                            <div className="w-full relative flex">

                                <input
                                    id="nationality"
                                    type="text"
                                    onChange={handleInputChange}
                                    onSelect={() => setIsNationalityDropdownDisplayed(true)}
                                    onBlur={() => setTimeout(() => setIsNationalityDropdownDisplayed(false), 200)}
                                    className={`w-[50%] border-b-2 ml-5  focus:outline-none py-2 px-3 placeholder:italic ${!nationalitySelected ? "border-red-500" : "border-black"}`}
                                    value={nationalitySelected?.name}
                                    placeholder="Nationnalité"

                                />

                                <div className="max-h-40 mt-1 w-[50%] ml-5 text-start   bg-white overflow-y-scroll top-full absolute">
                                    {isNationalityDropdownDisplayed &&

                                        countryList.map((country) => {
                                            return (
                                                <>
                                                    <div
                                                        className=" pl-2 hover:cursor-pointer hover:bg-red-300"
                                                        onClick={() => { setNationalitySelected(country) }}
                                                    >
                                                        <p>
                                                            {country.name}
                                                        </p>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="nationality" className="justify-self-start ml-2 mb-2">Image du pilote</label>
                            <input
                                className="  w-[80%] border-black border-2 py-2 px-3 ml-5 hover:bg-red-300 hover:cursor-pointer"
                                type="file"
                                name=""
                                id="" />

                        </div>
                    </div>
                    <div className="row-span-1 row-start-3 ">
                        <p className="text-red-600 text-center mb-5 font-bold min-h-[1.5rem]">{errorMessage}</p>
                        <div className="h-fit w-full row-start-5 flex flex-row justify-center">
                            <button
                                className="w-30 h-10 rounded-md bg-red-600 text-white font-bold hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300"

                                onClick={handleDriverSubmit}>Valider</button>
                        </div>
                    </div>



                </div>
            </div>

        </>
    );
}