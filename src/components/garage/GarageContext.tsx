"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface GarageVehicle {
  make: string;
  model: string;
  year?: string;
}

interface GarageContextType {
  vehicle: GarageVehicle | null;
  setVehicle: (v: GarageVehicle | null) => void;
  clearVehicle: () => void;
}

const GarageContext = createContext<GarageContextType>({
  vehicle: null,
  setVehicle: () => {},
  clearVehicle: () => {},
});

export function GarageProvider({ children }: { children: ReactNode }) {
  const [vehicle, setVehicleState] = useState<GarageVehicle | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("myGarage");
      if (saved) setVehicleState(JSON.parse(saved));
    } catch {}
  }, []);

  const setVehicle = (v: GarageVehicle | null) => {
    setVehicleState(v);
    if (v) {
      localStorage.setItem("myGarage", JSON.stringify(v));
    } else {
      localStorage.removeItem("myGarage");
    }
  };

  const clearVehicle = () => setVehicle(null);

  return (
    <GarageContext.Provider value={{ vehicle, setVehicle, clearVehicle }}>
      {children}
    </GarageContext.Provider>
  );
}

export function useGarage() {
  return useContext(GarageContext);
}
