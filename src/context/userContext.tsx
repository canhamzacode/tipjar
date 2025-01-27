"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { checkOrCreateAccount, fetchWalletTokens, getWalletAddressByUsername } from '@/utils';
import { IToken, IUser } from '../../types';
import { sendTipToBlockchain } from '@/utils/sendTipToBlockchain';
import { clusterApiUrl, Connection } from '@solana/web3.js';


interface UserContextType {
  user: IUser | null;
  tokens: IToken[];
  loading: boolean;
  fetchData: (walletAddress: string) => Promise<void>;
  sendTip: (receiverUsername: string, amount: number, message: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface IProps {
  children: ReactNode;
}


export const UserProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [tokens, setTokens] = useState<IToken[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const connection = new Connection(clusterApiUrl('devnet'));

  const fetchData = async (walletAddress: string) => {
    setLoading(true);
    try {
      const fetchedUser = await checkOrCreateAccount(walletAddress);
      setUser(fetchedUser);

      const fetchedTokens = await fetchWalletTokens(walletAddress);
      setTokens(fetchedTokens);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendTip = async (receiverUsername: string, amount: number) => {
    const receiverWalletAddress = await getWalletAddressByUsername(receiverUsername);
    if (receiverWalletAddress && user?.wallet_address) {
      
      
      console.log('Tip sent successfully:', signature);
    }
  };

  return (
    <UserContext.Provider value={{ user, tokens, loading, fetchData, sendTip: handleSendTip }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
