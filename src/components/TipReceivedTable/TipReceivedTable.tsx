"use client";
import React from 'react';
import { Table } from 'antd';

const TipsTable = () => {
  const tipsReceivedData = [
    {
      key: '1',
      coinName: 'Solana',
      transactionHash: '0xabc123...def456',
      symbol: 'SOL',
      valueInUSDC: 5.75,
    },
    {
      key: '2',
      coinName: 'Solana',
      transactionHash: '0xdef456...abc123',
      symbol: 'SOL',
      valueInUSDC: 3.25,
    },
    {
      key: '3',
      coinName: 'Solana',
      transactionHash: '0xghi789...klm012',
      symbol: 'SOL',
      valueInUSDC: 7.40,
    },
  ];

  const columns = [
    {
      title: 'Coin Name',
      dataIndex: 'coinName',
      key: 'coinName',
    },
    {
      title: 'Transaction Hash',
      dataIndex: 'transactionHash',
      key: 'transactionHash',
      render: (text:string) => (
        <a
          href={`https://explorer.solana.com/tx/${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {text.slice(0, 10)}...
        </a>
      ),
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Value in USDC',
      dataIndex: 'valueInUSDC',
      key: 'valueInUSDC',
      render: (text: number) => <span>${text.toFixed(2)}</span>,
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-black">Received Tips</h3>
      <Table
        columns={columns}
        dataSource={tipsReceivedData}
        pagination={false}
        rowClassName="hover:bg-gray-100"
        bordered
      />
    </div>
  );
};

export default TipsTable;
