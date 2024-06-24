import React, { useEffect } from 'react';
import { usePricesDao } from '@/contexts/PricesDao'; // Adjust the import path accordingly

type PricesProps = {
  marketId: string;
};

const Prices: React.FC<PricesProps> = ({ marketId }) => {
  const { setMarketId, prices, win, draw, lose, loading, error } = usePricesDao();

  useEffect(() => {
    setMarketId(marketId);
  }, [marketId, setMarketId]);

  if (loading) return <p>Loading prices...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex text-yellow space-x-4">
        <p>Win {win?.last_executed_price}%</p>
        <p>Draw {draw?.last_executed_price}%</p>
        <p>Lose {lose?.last_executed_price}%</p>
      </div>
    </div>
  );
};

export default Prices;
