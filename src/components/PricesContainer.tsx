"use client";

import { usePricesDao } from "@/contexts/PricesDao";

export default function PricesContainer() {
  const {mar} = usePricesDao();

  return (
    events.map((event) => (
      <MarketsDaoProvider>
        <div className="bg-dark-grey p-4 m-1 width-250px rounded-sm">
          <h1 className="text-green">{event.name}</h1>
          <Market eventId={event.id}/>
        </div>
      </MarketsDaoProvider>
    ))
  );
}
