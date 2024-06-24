'use client';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-dark-grey text-white">
      <div className="container mx-auto flex items-center justify-center p-2">
        <Image
          src="/smarketsLogo.png"
          alt="Smarkets Logo"
          width={100}
          height={100}
        />
      </div>
    </header>
  );
}
