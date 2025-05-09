import Button from "./button";




export default function NavBar() {

    return (
        <>
            <div className="w-full bg-black h-25 fixed right-0 border-b border-gray-700">

                <div className="grid grid-cols-[3fr_2fr_3fr] grid-row-1 w-full h-full">

                    <div className="col-span-1 col-start-1 flex flex-row items-center justify-start ml-12">
                        <img src="/images/logo/f1.png" alt="Logo de la F1" />
                        <i className="font-bold text-white text-2xl ml-3 ">Gestion d'écurie</i>
                    </div>
                    <div className="col-span-1 col-start-2">
                        <div className="grid grid-cols-3 grid-row-1 w-full h-full text-center justify-center items-center">
                            <Button label="Circuits" url="tracks"/>
                            <Button label="Ecuries" url="teams"/>
                            <Button label="Pilotes" url="drivers"/>
                        </div>
                    </div>
                    <div className="col-span-1 col-start-3 flex items-center justify-end mr-12 ">
                        <p className="text-2xl font-bold text-white mr-5 italic">User-1243</p>
                        <div onClick={()=> {alert("alarm")}}>
                            <img className="w-10"src="/images/logo/logout.png" alt="Bouton de déconnexion" />
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}


