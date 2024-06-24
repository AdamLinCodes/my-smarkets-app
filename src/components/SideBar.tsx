'use client';
import { useState } from 'react';
import SideBarOption from './SideBarOption';
import { useEventsDao } from '@/contexts/EventsDao';
import { sports, sportDisplayNames, Sport } from '@/constants/sports';

export default function SideBar() {
  const { setSelectedSport } = useEventsDao();
  const [selectedSport, setSport] = useState<Sport | null>(null);

  const toggleSport = (sport: Sport) => {
    setSport((prevSelected) => (prevSelected === sport ? null : sport));
    setSelectedSport(sport);
    //console.log('set the sport');
  };

  return (
    <div className="min-width-[300px] rounded-md bg-dark-grey p-2 text-center text-white">
      <ul className="space-y-2">
        {sports.map((sport) => (
          <SideBarOption
            key={sport}
            isSelected={selectedSport === sport}
            toggleSport={() => toggleSport(sport)}
          >
            {sportDisplayNames[sport]}
          </SideBarOption>
        ))}
      </ul>
    </div>
  );
}
