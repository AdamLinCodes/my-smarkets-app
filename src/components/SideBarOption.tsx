'use client';
import React, { ReactNode } from 'react';

type SideBarOptionProps = {
  children: ReactNode;
  isSelected: boolean;
  toggleSport: () => void;
};

export default function SideBarOption({
  children,
  isSelected,
  toggleSport,
}: SideBarOptionProps) {
  return (
    <li
      className={`cursor-pointer rounded-sm border border-mid-grey p-2 ${isSelected ? 'bg-green' : 'bg-mid-grey'} hover:border-green`}
      onClick={toggleSport}
    >
      {children}
    </li>
  );
}
