'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { sportDomains, Sport } from '@/constants/sports';
import { mockEvents } from '@/constants/mockData';

type EventsDaoType = {
  events: any[];
  fetchEvents: () => void;
  loading: boolean;
  error: string | null;
  setSelectedSport: (sport: Sport) => void;
};

const EventsDao = createContext<EventsDaoType | undefined>(undefined);

export const EventsDaoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  const fetchEvents = async () => {
    if (selectedSport === null) return; // Early return if no sport is selected

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3/events/?state=upcoming&with_new_type=false&sort=id&limit=5&type=${selectedSport}&type_domain=${sportDomains[selectedSport]}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setEvents(result.events);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchMockData = () => {
    setLoading(true);
    setError(null);
    try {
      const result = mockEvents;
      setEvents(result.events);
    } catch (error) {
      setError('An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    //fetchMockData();
  }, [selectedSport]);

  return (
    <EventsDao.Provider
      value={{ events, fetchEvents, loading, error, setSelectedSport }}
    >
      {children}
    </EventsDao.Provider>
  );
};

export const useEventsDao = (): EventsDaoType => {
  const context = useContext(EventsDao);

  if (context === undefined) {
    throw new Error('useEventsDao must be used within an EventsDaoProvider');
  }

  return context;
};
