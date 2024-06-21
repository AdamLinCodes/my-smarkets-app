"use client"
import React, { ReactNode } from "react";

type SideBarOptionProps = {
  children: ReactNode;
  sport: string;
  isSelected: boolean;
  toggleSport: () => void;
};

export default function SideBarOption({ children, isSelected, toggleSport }: SideBarOptionProps) {
  return (
    <li
      className={`cursor-pointer border border-mid-grey rounded-md p-2 mb-4 ${
        isSelected ? "bg-green" : "bg-mid-grey"
      } hover:border-green`}
      onClick={toggleSport}
    >
      {children}
    </li>
  );
}
