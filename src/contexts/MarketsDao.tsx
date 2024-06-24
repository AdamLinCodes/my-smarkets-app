"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { mockMarkets } from '@/constants/mockData';

type MarketsDaoType = {
  markets: any[];
  fetchMarkets: () => void;
  loading: boolean;
  error: string | null;
  setEventId: (eventId: string) => void;
}

const MarketsDao = createContext<MarketsDaoType | undefined>(undefined);

export const MarketsDaoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [markets, setMarkets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);

  const fetchMarkets = async () => {
    if (!eventId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3/events/${eventId}/markets/?sort=event_id%2Cdisplay_order&limit_by_event=5&popular=false&include_hidden=false`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setMarkets(result.markets.filter((market: any) => market.category === "winner"));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchMockData = () => {
    setLoading(true);
    setError(null);
    try {
      // Using mock data to simulate fetching
      const result = mockMarkets;
      const filteredMarkets = result.markets.filter((market: any) => market.category === "winner");
      setMarkets(filteredMarkets);
    } catch (error) {
      setError('An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //fetchMarkets();
    fetchMockData();
  }, [eventId]);

  return (
    <MarketsDao.Provider value={{ markets, fetchMarkets, loading, error, setEventId }}>
      {children}
    </MarketsDao.Provider>
  );
};

// Custom hook to use the MarketsDao
export const useMarketsDao = (): MarketsDaoType => {
  const context = useContext(MarketsDao);
  if (context === undefined) {
    throw new Error('useMarketsDao must be used within a MarketsDaoProvider');
  }
  return context;
};
