import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../authProvider";


export default function LoginForm() {

    const { handleLogin } = useAuth()
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [shake, setShake] = useState(false);
    const login = async () => {
        // Simuler un appel API


        const message = await handleLogin(email, password);
        if (message == null) {
            navigate("/mainPage");
            setErrorMessage("");
        }else{

            setErrorMessage("Identifiants invalides");
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }



    };

    return (
        <>
            <div className="h-full w-full grid grid-cols-1  grid-rows-[1fr_1fr_1fr_2fr_1fr] justify-center items-center">
                <div className="w-full flex row-start-1 justify-center">
                    <h1 className="text-3xl font-bold">Connectez-vous</h1>
                </div>
                <div className="h-fit w-full ml-3 max-w-sm row-start-2 flex flex-col ">
                    <label htmlFor="email" className="justify-self-start ml-2 mb-5">Email</label>
                    <input
                        className="w-[70%] border-b-2 ml-5 border-black focus:outline-none py-2 px-3 placeholder:italic "
                        id="email"
                        type="email"
                        value={email}
                        placeholder="abc@exemple.com"
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={
                            (e) => {
                                if (e.key === "Enter") {
                                    login()
                                }
                            }
                        }
                    />
                </div>
                <div className="h-fit w-full ml-3 max-w-sm row-start-3 flex flex-col ">
                    <label htmlFor="email" className="justify-self-start ml-2 mb-5">Mot de passe</label>
                    <input
                        className={`${shake ? 'animate-shake border-red-500' : ''} transition-all duration-300 w-[70%] border-b-2 ml-5 border-black focus:outline-none py-2 px-3 placeholder:italic`}
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={
                            (e) => {
                                if (e.key === "Enter") {
                                    login()
                                }
                            }
                        }
                    />
                </div>
                <div className="h-full row-start-4 flex flex-col justify-evenly items-center">
                    <p className="text-red-600 text-center mb-10 font-bold min-h-[1.5rem]">{errorMessage}</p>

                    <div className="font-bold text-xl">
                        <p>Pas encore de compte ? <br></br> Inscrivez-vous <a
                            className="text-red-600 hover:underline underline-offset-2"
                            href="">ici</a></p>
                    </div>
                </div>

                <div className="h-fit w-full row-start-5 flex flex-row justify-center">
                <button
                    className="w-30 h-10 rounded-md bg-red-600 text-white font-bold hover:cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300"
                    
                    onClick={login}>Valider</button>
                </div>
               
            </div>


        </>
    );
}