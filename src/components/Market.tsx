'use client';
import { useEffect } from 'react';
import { useMarketsDao } from '@/contexts/MarketsDao';
import Prices from './Prices';

type MarketProps = {
  eventId: string;
};

export default function Market({ eventId }: MarketProps) {
  const { markets, setEventId } = useMarketsDao();

  useEffect(() => {
    setEventId(eventId);
  }, [eventId, setEventId]);

  return (
    <div className="m-4 rounded-md text-xs text-white">
      {markets.map((market) => (
        <div className="p-2" key={market.id}>
          <p className="font-bold">
            {market.category.toUpperCase()} - {market.name}
          </p>
          <Prices marketId={market.id} />
        </div>
      ))}
    </div>
  );
}
