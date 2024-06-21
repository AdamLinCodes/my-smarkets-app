"use client";
import React from 'react';
import { useApiContext } from '@/contexts/ApiContext';

export default function Example() {
  const { responses } = useApiContext();

  return (
    <div>
      {Object.keys(responses).map((sport) => (
        <div className="text-white" key={sport}>
          <h2>{sport}</h2>
          <pre>{JSON.stringify(responses[sport], null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
