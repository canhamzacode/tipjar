"use client";

import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import React from 'react';

const ConnectButton = () => {
  const { open, } = useAppKit();
  const { isConnected } = useAppKitAccount();

  return (
    <button
      onClick={() => open()}
      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gradient-to-r transition-all duration-300 hover:border-purple-600 border border-purple-600 text-base"
    >
    {isConnected ? 'Disconnect' : 'Connect Wallet'}
  </button>
  );
};

export default ConnectButton;
