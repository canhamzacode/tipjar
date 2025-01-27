"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { checkOrCreateAccount, fetchWalletTokens } from '@/utils';
import { IToken, IUser, WalletProvider } from '../../types';
import { Connection, clusterApiUrl, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useAppKitProvider } from '@reown/appkit/react';

interface UserContextType {
  user: IUser | null;
  tokens: IToken[];
  loading: boolean;
  fetchData: (walletAddress: string) => Promise<void>;
  sendTip: (recipientAddress: string, amount: number) => Promise<string>;
  getSolBalance: (walletAddress: string) => void;
  solBalance: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface IProps {
  children: ReactNode;
}


export const UserProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [tokens, setTokens] = useState<IToken[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { walletProvider } = useAppKitProvider<WalletProvider>("solana");
  const [solBalance, setSolBalance] = useState<number>(0);

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

  const sendTip = async (recipientAddress: string, amount: number): Promise<string> => {
    if (!user?.wallet_address) {
      throw new Error("Please connect your wallet.");
    }

    try {
      const lamports = amount * 1000000000;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(user.wallet_address),
          toPubkey: new PublicKey(recipientAddress),
          lamports: lamports,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(user.wallet_address);

      const signedTransaction = await walletProvider.signTransaction(transaction);

      const signature = await walletProvider.sendTransaction(signedTransaction, connection);

      alert("Tip sent successfully!");
      return signature;
    } catch (error) {
      console.error("Error sending tip:", error);
      throw new Error("Failed to send tip.");
    }
  };


  const getSolBalance = async (walletAddress: string) => {
    try {
      const publicKey = new PublicKey(walletAddress);
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSol = balanceInLamports / 1000000000;
      setSolBalance(balanceInSol);
    } catch (error) {
      console.error('Error fetching SOL balance:', error);
      throw new Error('Failed to fetch SOL balance');
    }
  };

  return (
    <UserContext.Provider value={{ user, tokens, loading, fetchData, sendTip, getSolBalance, solBalance }}>
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
