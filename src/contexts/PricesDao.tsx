"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { mockMarkets, mockPrices } from '@/constants/mockData';

type PricesDaoType = {
  prices: any[];
  win: any | null;
  draw: any | null;
  lose: any | null;
  fetchPrices: () => void;
  loading: boolean;
  error: string | null;
  setMarketId: (marketId: string | null) => void;
}

const PricesDao = createContext<PricesDaoType | undefined>(undefined);

export const PricesDaoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<any[]>([]);
  const [win, setWin] = useState<any | null>(null);
  const [draw, setDraw] = useState<any | null>(null);
  const [lose, setLose] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [marketId, setMarketId] = useState<string | null>(null);

  const fetchPrices = async () => {
    if (!marketId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3/markets/${marketId}/last_executed_prices/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      const prices = result.last_executed_prices[marketId];
      setPrices(prices);

      if (prices.length === 3) {
        const sortedPrices = prices.sort((a: any, b: any) => a.contract_id.localeCompare(b.contract_id));
        setWin(sortedPrices[0]);
        setDraw(sortedPrices[1]);
        setLose(sortedPrices[2]);
      } else {
        setWin(null);
        setDraw(null);
        setLose(null);
      }
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
      const result = mockPrices;
      setPrices(result.last_executed_prices[57257201]);
      
      if (prices.length === 3) {
        const sortedPrices = prices.sort((a: any, b: any) => a.contract_id.localeCompare(b.contract_id));
        setWin(sortedPrices[0]);
        setDraw(sortedPrices[1]);
        setLose(sortedPrices[2]);
      } else {
        setWin(null);
        setDraw(null);
        setLose(null);
      }
    } catch (error) {
      setError('An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //fetchPrices();
    fetchMockData();
  }, [marketId]);

  return (
    <PricesDao.Provider value={{ prices, win, draw, lose, fetchPrices, loading, error, setMarketId }}>
      {children}
    </PricesDao.Provider>
  );
};

// Custom hook to use the PricesDao
export const usePricesDao = (): PricesDaoType => {
  const context = useContext(PricesDao);
  if (context === undefined) {
    throw new Error('usePricesDao must be used within a PricesDaoProvider');
  }
  return context;
};
