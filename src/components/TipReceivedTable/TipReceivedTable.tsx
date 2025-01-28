"use client";
import React from 'react';
import { Table } from 'antd';
import { useUser } from '@/context/userContext';
import { ITransaction } from '../../../types';
import { useAppKitAccount } from '@reown/appkit/react';
import { SOLANA_EXPLORER_URL } from '@/config';

const TipsTable = () => {
  const { transactions,loading } = useUser();
  const { address } = useAppKitAccount();

  const tipsReceivedData = transactions.map((transaction: ITransaction, index: number) => ({
    key: index + 1,
    coinName: 'Solana',
    transactionHash: transaction.transaction_hash,
    symbol: 'SOL',
    valueInSOL: transaction.amount,
    status: transaction.receiver_wallet_address === address ? 'Received' : 'Sent', 
    message: transaction.message || '-',
  }));

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
      render: (text: string) => (
        <a
          href={SOLANA_EXPLORER_URL.replace("{transactionHash}", text)}
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
      title: 'Value in SOL',
      dataIndex: 'valueInSOL',
      key: 'valueInSOL',
      render: (text: number) => <span>{text.toFixed(4)} SOL</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-white ${
            status === 'Received' ? 'bg-blue-500' : 'bg-purple-500'
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (message: string) => (
        <span className="text-gray-700">{message}</span>
      ),
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
        loading={loading}
        bordered
      />
    </div>
  );
};

export default TipsTable;
