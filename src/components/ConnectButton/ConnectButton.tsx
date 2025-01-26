"use client";

import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import React from 'react';

const ConnectButton = () => {
  const { open } = useAppKit();
  const { isConnected, } = useAppKitAccount();

  return (
    <button
      onClick={() => open()}
      className="bg-gradient-to-r from-teal-400 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-500 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300 ease-in-out"
    >
    {isConnected ? 'Disconnect' : 'Connect Wallet'}
  </button>
  );
};

export default ConnectButton;
