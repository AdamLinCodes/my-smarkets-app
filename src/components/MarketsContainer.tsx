'use client';
import { MarketsDaoProvider } from '@/contexts/MarketsDao';
import Market from './Market';
import { useEventsDao } from '@/contexts/EventsDao';
import { PricesDaoProvider } from '@/contexts/PricesDao';

export default function MarketsContainer() {
  const { events } = useEventsDao();

  return events.map((event) => (
    <MarketsDaoProvider key={event.id}>
      <PricesDaoProvider>
        <div className="width-250px m-1 rounded-sm bg-dark-grey p-4">
          <h1 className="text-green">{event.name}</h1>
          <Market eventId={event.id} />
        </div>
      </PricesDaoProvider>
    </MarketsDaoProvider>
  ));
}
