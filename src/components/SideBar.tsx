"use client";
import React, { useState, useEffect, useRef } from "react";
import SideBarOption from "./SideBarOption";
import { useApiContext } from "@/contexts/ApiContext";

type Sport = "american_football_match" | "basketball_match" | "football_match" | "ice_hockey_match" | "volleyball_match" | "golf_match";

const sports: Sport[] = ["american_football_match", "basketball_match", "football_match", "ice_hockey_match", "volleyball_match", "golf_match"];
const sportDomains: Record<Sport, string> = {
  american_football_match: "american_football",
  basketball_match: "basketball",
  football_match: "football",
  ice_hockey_match: "ice_hockey",
  volleyball_match: "volleyball",
  golf_match: "golf"
};
const sportDisplayNames: Record<Sport, string> = {
  american_football_match: "Football",
  basketball_match: "Basketball",
  football_match: "Soccer",
  ice_hockey_match: "Hockey",
  volleyball_match: "Volleyball",
  golf_match: "Golf"
};

export default function SideBar() {
  const { addSport, removeSport, clearSports } = useApiContext(); // Use the context
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const prevSelectedSportsRef = useRef<Sport[]>([]);

  // Adds or removes selected sports from the selectedSports state
  const toggleSport = (sport: Sport) => {
    setSelectedSports((prevSelected) => {
      if (prevSelected.includes(sport)) {
        return prevSelected.filter((s) => s !== sport);
      } else {
        return [...prevSelected, sport];
      }
    });
  };

  // Sync context state when selectedSports changes
  useEffect(() => {
    const prevSelectedSports = prevSelectedSportsRef.current;

    // Add new sports
    selectedSports.forEach((sport) => {
      if (!prevSelectedSports.includes(sport)) {
        addSport(sport, sportDomains[sport]);
      }
    });

    // Remove unselected sports
    prevSelectedSports.forEach((sport) => {
      if (!selectedSports.includes(sport)) {
        removeSport(sport);
      }
    });

    // Update ref with current selected sports
    prevSelectedSportsRef.current = selectedSports;
  }, [selectedSports, addSport, removeSport]);

  // Clears the selectedSports
  const clearSelection = () => {
    setSelectedSports([]);
    clearSports();
  };

  return (
    <div className="bg-dark-grey w-1/4 text-white p-2 m-4 rounded-md text-center">
      <ul className="p-2">
        {sports.map((sport) => (
          <SideBarOption
            key={sport}
            sport={sport}
            isSelected={selectedSports.includes(sport)}
            toggleSport={() => toggleSport(sport)}
          >
            {sportDisplayNames[sport]}
          </SideBarOption>
        ))}
      </ul>

      <div className="bg-red m-2 text-white p-2 rounded-md cursor-pointer" onClick={clearSelection}>
        Clear
      </div>
    </div>
  );
}
