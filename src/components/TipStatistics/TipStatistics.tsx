"use client";
import React from 'react';
import { TipButtons } from '../TipButton';
import { useUser } from '@/context/userContext';

const TipStatistics = () => {
  const {user} = useUser();
  return (
    <div className="w-full bg-white text-black shadow-lg rounded-lg p-6 mb-6">
      <div className='flex items-center justify-between'>
        <h2 className="text-2xl font-semibold mb-4">Tip Dashboard</h2>
        <TipButtons />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Tips Sent</h3>
          <p className="text-2xl">{user?.total_sent}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Tips Received</h3>
          <p className="text-2xl">{user?.total_received}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Total Tipped</h3>
          <p className="text-2xl">${user?.total_tips_sent}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Total Received</h3>
          <p className="text-2xl">${user?.total_tips_received}</p>
        </div>
      </div>
    </div>
  );
};

export default TipStatistics;
