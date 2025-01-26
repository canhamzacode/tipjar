import React from 'react';
import { ConnectButton } from '../ConnectButton';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white flex items-center justify-between px-6 py-2 shadow-lg sticky top-0 z-50">
      <Link href="/" className="text-white text-2xl font-semibold hover:text-teal-500 transition duration-200">
        TipJar
      </Link>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
