import React, { useEffect } from 'react';
import { usePricesDao } from '@/contexts/PricesDao';

type PricesProps = {
  marketId: string;
};

const Prices: React.FC<PricesProps> = ({ marketId }) => {
  const { setMarketId, win, draw, lose, loading, error } =
    usePricesDao();

  useEffect(() => {
    setMarketId(marketId);
  }, [marketId, setMarketId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex space-x-4 text-yellow">
        <p>Win {win?.last_executed_price}%</p>
        <p>Draw {draw?.last_executed_price}%</p>
        <p>Lose {lose?.last_executed_price}%</p>
      </div>
    </div>
  );
};

export default Prices;
