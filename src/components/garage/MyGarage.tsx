"use client";

import { useState } from "react";
import { Car, ChevronDown, X, CheckCircle } from "lucide-react";
import { useGarage } from "./GarageContext";

const GARAGE_DATA: Record<string, Record<string, string[]>> = {
  Hyundai: {
    Sonata: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    Elantra: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    Tucson: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    "Santa Fe": ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    Palisade: ["2019", "2020", "2021", "2022", "2023", "2024"],
    Grandeur: ["2017", "2018", "2019", "2020", "2021", "2022"],
    Kona: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    Ioniq: ["2017", "2018", "2019", "2020", "2021", "2022"],
  },
  Kia: {
    K5: ["2020", "2021", "2022", "2023", "2024"],
    Cerato: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Sportage: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    Sorento: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    Carnival: ["2021", "2022", "2023", "2024"],
    Seltos: ["2020", "2021", "2022", "2023", "2024"],
    Stinger: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Niro: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
  },
  Genesis: {
    G70: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    G80: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    G90: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    GV70: ["2021", "2022", "2023", "2024"],
    GV80: ["2020", "2021", "2022", "2023", "2024"],
  },
};

interface MyGarageProps {
  compact?: boolean;
  onSelect?: () => void;
}

export default function MyGarage({ compact = false, onSelect }: MyGarageProps) {
  const { vehicle, setVehicle, clearVehicle } = useGarage();
  const [make, setMake] = useState(vehicle?.make || "");
  const [model, setModel] = useState(vehicle?.model || "");
  const [year, setYear] = useState(vehicle?.year || "");
  const [saved, setSaved] = useState(false);

  const makes = Object.keys(GARAGE_DATA);
  const models = make ? Object.keys(GARAGE_DATA[make] || {}) : [];
  const years = make && model ? GARAGE_DATA[make]?.[model] || [] : [];

  const handleSave = () => {
    if (!make || !model || !year) return;
    setVehicle({ make, model, year });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onSelect?.();
  };

  const handleClear = () => {
    clearVehicle();
    setMake("");
    setModel("");
    setYear("");
  };

  const handleMakeChange = (m: string) => {
    setMake(m);
    setModel("");
    setYear("");
  };

  const handleModelChange = (m: string) => {
    setModel(m);
    setYear("");
  };

  if (compact && vehicle) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700">
        <Car className="w-3.5 h-3.5 shrink-0" />
        <span className="text-xs font-semibold">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </span>
        <button
          onClick={handleClear}
          className="ml-1 text-blue-400 hover:text-blue-700 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">My Garage</h3>
            <p className="text-[11px] text-slate-500">Select your vehicle for compatibility</p>
          </div>
        </div>
        {vehicle && (
          <button
            onClick={handleClear}
            className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
          >
            Clear
          </button>
        )}
      </div>

      {vehicle && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200">
          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-xs font-semibold text-emerald-700">
            {vehicle.year} {vehicle.make} {vehicle.model} — set
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {/* Make */}
        <div className="relative">
          <select
            value={make}
            onChange={(e) => handleMakeChange(e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 pr-7"
          >
            <option value="">Make</option>
            {makes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Model */}
        <div className="relative">
          <select
            value={model}
            onChange={(e) => handleModelChange(e.target.value)}
            disabled={!make}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 pr-7 disabled:opacity-50"
          >
            <option value="">Model</option>
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Year */}
        <div className="relative">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            disabled={!model}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 pr-7 disabled:opacity-50"
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!make || !model || !year}
        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-colors shadow-sm shadow-blue-200"
      >
        {saved ? "✓ Vehicle Saved!" : "Save My Vehicle"}
      </button>
    </div>
  );
}
