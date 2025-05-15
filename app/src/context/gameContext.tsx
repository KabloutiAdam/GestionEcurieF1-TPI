import { createContext, useContext, useState, type ReactNode } from "react";
import type { driverInterface, teamInterface } from "../interfaces";


type GameContextType = {
  selectedTeam: teamInterface | null;
  setSelectedTeam: (team: teamInterface) => void;
  selectedDrivers: driverInterface[];
  setSelectedDrivers: React.Dispatch<React.SetStateAction<driverInterface[]>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTeam, setSelectedTeam] = useState<teamInterface | null>(null);
  const [selectedDrivers, setSelectedDrivers] = useState<driverInterface[]>([]);

  return (
    <GameContext.Provider value={{ selectedTeam, setSelectedTeam, selectedDrivers, setSelectedDrivers }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};