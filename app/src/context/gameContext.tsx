import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { driverInterface, teamInterface } from "../interfaces";
import { useNavigate } from "react-router";
import axios from "axios";


type GameContextType = {
  selectedTeam: teamInterface | null;
  setSelectedTeam: React.Dispatch<React.SetStateAction<teamInterface | null>>;
  selectedDrivers: driverInterface[];
  setSelectedDrivers: React.Dispatch<React.SetStateAction<driverInterface[]>>;
  gameState: string;
  trackOrder: number;
  setGameState: React.Dispatch<React.SetStateAction<string>>;
  startSeason: () => Promise<void>;

};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTeam, setSelectedTeam] = useState<teamInterface | null>(null);
  const [selectedDrivers, setSelectedDrivers] = useState<driverInterface[]>([]);
  const [gameState, setGameState] = useState<string>("");
  const [trackOrder, setTrackOrder] = useState<number>(1);

  const [driverList, setDriverList] = useState<driverInterface[]>([])
  const [teamList, setTeamList] = useState<teamInterface[]>([])


  const navigate = useNavigate()

  useEffect(() => {
    const settings = localStorage.getItem("gameSettings");
    const state = localStorage.getItem("gameState");

    if (settings) {
      const parsed = JSON.parse(settings);
      if (parsed[0]) setSelectedDrivers(parsed[0]);
      if (parsed[1]) setSelectedTeam(parsed[1]);
      if (parsed[2]) setTrackOrder(parsed[2]);
    }

    if (state) {
      setGameState(state);
    }
  }, []);


  async function startSeason() {
    setGameState("start")
    localStorage.setItem("gameState", "start")
    localStorage.setItem("inGame", "true")
    const gameSettings = [selectedDrivers, selectedTeam]

    try {
      const resDrivers = await axios.get("/api/drivers");
      const resTeams = await axios.get("/api/teams");

      setDriverList(resDrivers.data);
      const filteredDriverList = resDrivers.data.filter((driver: driverInterface) =>
        !selectedDrivers.some(selected => selected.id === driver.id)
      );
      setDriverList(filteredDriverList);
      setTeamList(resTeams.data);

      const tempDriverArray: driverInterface[] = filteredDriverList;
      const tempTeamArray: teamInterface[] = resTeams.data;

      tempTeamArray.forEach(team => {

        if (team.id === selectedTeam?.id) {
          for (const driver of selectedDrivers) {
            axios.post("/api/drivers/updateTeam", {
              idDriver: driver.id,
              idTeam: selectedTeam.id,
            }).catch(err => {
              console.error(`Erreur lors de l'affectation de ${driver.firstname}`, err);
            });
          }
          return
        }



        const teamDrivers: driverInterface[] = [];

        for (let i = 0; i < 2; i++) {
          if (tempDriverArray.length === 0) break;

          const randomIndex = Math.floor(Math.random() * tempDriverArray.length);
          const selectedDriver = tempDriverArray[randomIndex];


          axios.post("/api/drivers/updateTeam", {
            idDriver: selectedDriver.id,
            idTeam: team.id,
          }).catch(err => {
            console.error(`Erreur lors de l'affectation de ${selectedDriver.firstname}`, err);
          });

          teamDrivers.push(selectedDriver);
          tempDriverArray.splice(randomIndex, 1);
        }


      });
      console.log()


    } catch (error) {
      console.error("erreur")
    }

    navigate("/game/gamePage")





    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));

    console.log("fin")

  }




  async function raceSimulation() {



  }



  return (
    <GameContext.Provider value={{ selectedTeam, setSelectedTeam, selectedDrivers, setSelectedDrivers, startSeason, gameState, trackOrder,setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};