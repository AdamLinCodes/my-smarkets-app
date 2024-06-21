"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define types for the context values
interface ApiContextType {
  selectedSports: { sport: string, domain: string }[];
  addSport: (sport: string, domain: string) => void;
  removeSport: (sport: string) => void;
  clearSports: () => void;
  responses: { [sport: string]: any }; // Add responses to the context type
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSports, setSelectedSports] = useState<{ sport: string, domain: string }[]>([]);
  const [responses, setResponses] = useState<{ [sport: string]: any }>({}); // State for storing responses

  const addSport = (sport: string, domain: string) => {
    setSelectedSports((prevSelected) => {
      if (prevSelected.some((s) => s.sport === sport)) {
        return prevSelected;
      }
      return [...prevSelected, { sport, domain }];
    });
  };

  const removeSport = (sport: string) => {
    setSelectedSports((prevSelected) => 
      prevSelected.filter((s) => s.sport !== sport)
    );
    setResponses((prevResponses) => {
      const newResponses = { ...prevResponses };
      delete newResponses[sport];
      return newResponses;
    });
  };

  const clearSports = () => {
    setSelectedSports([]);
    setResponses({});
  };

  const fetchData = async (sport: string, domain: string) => {
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3/events/?state=upcoming&with_new_type=false&sort=id&limit=5&include_hidden=false&type_domain=accumulator&type=${sport}&type_domain=${domain}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setResponses((prevResponses) => ({
        ...prevResponses,
        [sport]: result,
      }));
    } catch (error) {
      console.error(`Failed to fetch data for ${sport}:`, error);
    }
  };

  useEffect(() => {
    selectedSports.forEach(({ sport, domain }) => {
      fetchData(sport, domain);
    });
  }, [selectedSports]);

  return (
    <ApiContext.Provider value={{ selectedSports, addSport, removeSport, clearSports, responses }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the ApiContext
export const useApiContext = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
};
