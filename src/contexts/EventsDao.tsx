"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { sportDomains, Sport } from "@/constants/sports";
import { mockEvents } from '@/constants/mockData';

type EventsDaoType = {
  events: any[];
  fetchEvents: () => void;
  loading: boolean;
  error: string | null;
  setSelectedSport: (sport: Sport) => void;
}

const EventsDao = createContext<EventsDaoType | undefined>(undefined);

export const EventsDaoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  const fetchEvents = async () => {
    if (selectedSport === null) return; // Early return if no sport is selected

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3/events/?state=upcoming&with_new_type=false&sort=id&limit=5&type=${selectedSport}&type_domain=${sportDomains[selectedSport]}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setEvents(result.events);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
    // setEvents(
    //   [
    //     {
    //         "bet_allowed": true,
    //         "bettable": true,
    //         "chart_time_period": null,
    //         "created": "2023-12-10T12:53:46.404135Z",
    //         "description": "",
    //         "display_order": 0,
    //         "end_date": null,
    //         "full_slug": "/sport/football/copa-america/2024/06/23/22-00/usa-vs-bolivia",
    //         "hidden": false,
    //         "id": "43598395",
    //         "inplay_enabled": true,
    //         "modified": "2024-06-23T21:13:05.237466Z",
    //         "name": "USA vs Bolivia",
    //         "parent_id": "42242135",
    //         "seo_description": "Bet on {{ contracts.home.name }} vs {{ contracts.away.name }} on {{ event.start_datetime | date \"eeee, d MMMM\" }}.\r\n\r\nWith the Smarkets exchange, you can back or lay your bets on the clash between {{ contracts.home.name }} and {{ contracts.away.name }} on {{ event.start_datetime | date \"eeee, d MMMM\" }}. This game has {{ markets.length }} markets available to bet on. The most popular market so far is {{ markets.0.name }}.\r\n\r\nThe favourites to win the game between {{ contracts.home.name }} and {{ contracts.away.name }} as of publication are {{ contracts.fav.name }} who are priced at odds of {{ contracts.fav.anyPrice | odds }}. The odds of a draw are {{ contracts.draw.anyPrice | odds }} while the odds for {{ contracts.other.name }} to win are {{ contracts.other.anyPrice | odds }}.\r\n\r\nA {{ 10 | money }} back bet on {{ contracts.fav.name }} to win returns {{ contracts.fav.buyPrice | payout 10 }}, whereas a {{ 10 | money }} back bet on {{ contracts.other.name }} to win are {{ contracts.other.buyPrice | payout 10 }}. If you think neither side will come away with the victory, betting the same amount in a back bet on the draw would win you {{ contracts.draw.buyPrice | payout 10 }}.\r\n\r\nAs Smarkets is an exchange, you can also place lay bets on all outcomes for {{ contracts.home.name }} vs {{ contracts.away.name }}.\r\nYou can also use the bet calculator to help you calculate potential winnings.",
    //         "short_name": "USA vs. BOL",
    //         "slug": "usa-vs-bolivia",
    //         "special_rules": "",
    //         "start_date": "2024-06-23",
    //         "start_datetime": "2024-06-23T22:00:00Z",
    //         "state": "upcoming",
    //         "type": "football_match"
    //     },
    //     {
    //         "bet_allowed": true,
    //         "bettable": true,
    //         "chart_time_period": null,
    //         "created": "2023-12-10T12:54:40.843233Z",
    //         "description": "",
    //         "display_order": 0,
    //         "end_date": null,
    //         "full_slug": "/sport/football/copa-america/2024/06/24/01-00/uruguay-vs-panama",
    //         "hidden": false,
    //         "id": "43598398",
    //         "inplay_enabled": true,
    //         "modified": "2024-06-23T21:04:56.781909Z",
    //         "name": "Uruguay vs Panama",
    //         "parent_id": "42242135",
    //         "seo_description": "Bet on {{ contracts.home.name }} vs {{ contracts.away.name }} on {{ event.start_datetime | date \"eeee, d MMMM\" }}.\r\n\r\nWith the Smarkets exchange, you can back or lay your bets on the clash between {{ contracts.home.name }} and {{ contracts.away.name }} on {{ event.start_datetime | date \"eeee, d MMMM\" }}. This game has {{ markets.length }} markets available to bet on. The most popular market so far is {{ markets.0.name }}.\r\n\r\nThe favourites to win the game between {{ contracts.home.name }} and {{ contracts.away.name }} as of publication are {{ contracts.fav.name }} who are priced at odds of {{ contracts.fav.anyPrice | odds }}. The odds of a draw are {{ contracts.draw.anyPrice | odds }} while the odds for {{ contracts.other.name }} to win are {{ contracts.other.anyPrice | odds }}.\r\n\r\nA {{ 10 | money }} back bet on {{ contracts.fav.name }} to win returns {{ contracts.fav.buyPrice | payout 10 }}, whereas a {{ 10 | money }} back bet on {{ contracts.other.name }} to win are {{ contracts.other.buyPrice | payout 10 }}. If you think neither side will come away with the victory, betting the same amount in a back bet on the draw would win you {{ contracts.draw.buyPrice | payout 10 }}.\r\n\r\nAs Smarkets is an exchange, you can also place lay bets on all outcomes for {{ contracts.home.name }} vs {{ contracts.away.name }}.\r\nYou can also use the bet calculator to help you calculate potential winnings.",
    //         "short_name": "URU vs. PAN",
    //         "slug": "uruguay-vs-panama",
    //         "special_rules": "",
    //         "start_date": "2024-06-24",
    //         "start_datetime": "2024-06-24T01:00:00Z",
    //         "state": "upcoming",
    //         "type": "football_match"
    //     },
    //     {
    //         "bet_allowed": true,
    //         "bettable": true,
    //         "chart_time_period": null,
    //         "created": "2023-12-10T12:54:50.666604Z",
    //         "description": "",
    //         "display_order": 0,
    //         "end_date": null,
    //         "full_slug": "/sport/football/copa-america/2024/06/24/22-00/colombia-vs-paraguay",
    //         "hidden": false,
    //         "id": "43598399",
    //         "inplay_enabled": true,
    //         "modified": "2024-06-23T20:58:22.613158Z",
    //         "name": "Colombia vs Paraguay",
    //         "parent_id": "42242135",
    //         "seo_description": "Bet on {{ contracts.home.name }} vs {{ contracts.away.name }} on {{ event.start_datetime | date \"eeee, d MMMM\" }}.\r\n\r\nWith the Smarkets exchange, you can back or lay your bets on the clash between {{ contracts.home.name }} and {{ contracts.away.name }} on {{ event.start_datetime | date \"eeee, d MMMM\" }}. This game has {{ markets.length }} markets available to bet on. The most popular market so far is {{ markets.0.name }}.\r\n\r\nThe favourites to win the game between {{ contracts.home.name }} and {{ contracts.away.name }} as of publication are {{ contracts.fav.name }} who are priced at odds of {{ contracts.fav.anyPrice | odds }}. The odds of a draw are {{ contracts.draw.anyPrice | odds }} while the odds for {{ contracts.other.name }} to win are {{ contracts.other.anyPrice | odds }}.\r\n\r\nA {{ 10 | money }} back bet on {{ contracts.fav.name }} to win returns {{ contracts.fav.buyPrice | payout 10 }}, whereas a {{ 10 | money }} back bet on {{ contracts.other.name }} to win are {{ contracts.other.buyPrice | payout 10 }}. If you think neither side will come away with the victory, betting the same amount in a back bet on the draw would win you {{ contracts.draw.buyPrice | payout 10 }}.\r\n\r\nAs Smarkets is an exchange, you can also place lay bets on all outcomes for {{ contracts.home.name }} vs {{ contracts.away.name }}.\r\nYou can also use the bet calculator to help you calculate potential winnings.",
    //         "short_name": "COL vs. PAR",
    //         "slug": "colombia-vs-paraguay",
    //         "special_rules": "",
    //         "start_date": "2024-06-24",
    //         "start_datetime": "2024-06-24T22:00:00Z",
    //         "state": "upcoming",
    //         "type": "football_match"
    //     },
    //     {
    //         "bet_allowed": true,
    //         "bettable": true,
    //         "chart_time_period": null,
    //         "created": "2024-03-24T11:55:48.705862Z",
    //         "description": "",
    //         "display_order": 0,
    //         "end_date": null,
    //         "full_slug": "/sport/football/copa-america/2024/06/25/01-00/brazil-vs-costa-rica",
    //         "hidden": false,
    //         "id": "43764101",
    //         "inplay_enabled": true,
    //         "modified": "2024-06-23T16:20:29.095874Z",
    //         "name": "Brazil vs Costa Rica",
    //         "parent_id": "42242135",
    //         "seo_description": "Bet on {{ contracts.home.name }} vs {{ contracts.away.name }} on {{ event.start_datetime | date \"eeee, d MMMM\" }}.\r\n\r\nWith the Smarkets exchange, you can back or lay your bets on the clash between {{ contracts.home.name }} and {{ contracts.away.name }} on {{ event.start_datetime | date \"eeee, d MMMM\" }}. This game has {{ markets.length }} markets available to bet on. The most popular market so far is {{ markets.0.name }}.\r\n\r\nThe favourites to win the game between {{ contracts.home.name }} and {{ contracts.away.name }} as of publication are {{ contracts.fav.name }} who are priced at odds of {{ contracts.fav.anyPrice | odds }}. The odds of a draw are {{ contracts.draw.anyPrice | odds }} while the odds for {{ contracts.other.name }} to win are {{ contracts.other.anyPrice | odds }}.\r\n\r\nA {{ 10 | money }} back bet on {{ contracts.fav.name }} to win returns {{ contracts.fav.buyPrice | payout 10 }}, whereas a {{ 10 | money }} back bet on {{ contracts.other.name }} to win are {{ contracts.other.buyPrice | payout 10 }}. If you think neither side will come away with the victory, betting the same amount in a back bet on the draw would win you {{ contracts.draw.buyPrice | payout 10 }}.\r\n\r\nAs Smarkets is an exchange, you can also place lay bets on all outcomes for {{ contracts.home.name }} vs {{ contracts.away.name }}.\r\nYou can also use the bet calculator to help you calculate potential winnings.",
    //         "short_name": "BRA vs. COS",
    //         "slug": "brazil-vs-costa-rica",
    //         "special_rules": "",
    //         "start_date": "2024-06-25",
    //         "start_datetime": "2024-06-25T01:00:00Z",
    //         "state": "upcoming",
    //         "type": "football_match"
    //     },
    //     {
    //         "bet_allowed": true,
    //         "bettable": true,
    //         "chart_time_period": null,
    //         "created": "2024-05-21T19:54:04.129215Z",
    //         "description": "",
    //         "display_order": 0,
    //         "end_date": null,
    //         "full_slug": "/sport/football/copa-america/2024/06/25/22-00/peru-vs-canada",
    //         "hidden": false,
    //         "id": "43858942",
    //         "inplay_enabled": true,
    //         "modified": "2024-06-23T10:02:37.260316Z",
    //         "name": "Peru vs Canada",
    //         "parent_id": "42242135",
    //         "seo_description": "Bet on {{ contracts.home.name }} vs {{ contracts.away.name }} on {{ event.start_datetime | date \"eeee, d MMMM\" }}.\r\n\r\nWith the Smarkets exchange, you can back or lay your bets on the clash between {{ contracts.home.name }} and {{ contracts.away.name }} on {{ event.start_datetime | date \"eeee, d MMMM\" }}. This game has {{ markets.length }} markets available to bet on. The most popular market so far is {{ markets.0.name }}.\r\n\r\nThe favourites to win the game between {{ contracts.home.name }} and {{ contracts.away.name }} as of publication are {{ contracts.fav.name }} who are priced at odds of {{ contracts.fav.anyPrice | odds }}. The odds of a draw are {{ contracts.draw.anyPrice | odds }} while the odds for {{ contracts.other.name }} to win are {{ contracts.other.anyPrice | odds }}.\r\n\r\nA {{ 10 | money }} back bet on {{ contracts.fav.name }} to win returns {{ contracts.fav.buyPrice | payout 10 }}, whereas a {{ 10 | money }} back bet on {{ contracts.other.name }} to win are {{ contracts.other.buyPrice | payout 10 }}. If you think neither side will come away with the victory, betting the same amount in a back bet on the draw would win you {{ contracts.draw.buyPrice | payout 10 }}.\r\n\r\nAs Smarkets is an exchange, you can also place lay bets on all outcomes for {{ contracts.home.name }} vs {{ contracts.away.name }}.\r\nYou can also use the bet calculator to help you calculate potential winnings.",
    //         "short_name": "PER vs. CAN",
    //         "slug": "peru-vs-canada",
    //         "special_rules": "",
    //         "start_date": "2024-06-25",
    //         "start_datetime": "2024-06-25T22:00:00Z",
    //         "state": "upcoming",
    //         "type": "football_match"
    //     }
    //   ]
    // )
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
    //fetchEvents();
    fetchMockData();
  }, [selectedSport]);

  return (
    <EventsDao.Provider value={{ events, fetchEvents, loading, error, setSelectedSport }}>
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
