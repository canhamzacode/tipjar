"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { checkOrCreateAccount, fetchWalletTokens, getAllTransactions } from "@/utils";
import { IToken, ITransaction, IUser, WalletProvider } from "../../types";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useAppKitProvider } from "@reown/appkit/react";
import { connection } from "@/config";

interface TransactionSummary {
  totalSent: number;
  totalReceived: number;
  totalAmount: number;
  totalSentCount: number;
  totalReceivedCount: number;
}

interface UserContextType {
  user: IUser | null;
  tokens: IToken[];
  transactions: ITransaction[];
  transactionSummary: TransactionSummary | null;
  loading: boolean;
  fetchData: (walletAddress: string) => Promise<void>;
  fetchAllTransactions: (walletAddress: string) => Promise<void>;
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
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [transactionSummary, setTransactionSummary] = useState<TransactionSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { walletProvider } = useAppKitProvider<WalletProvider>("solana");
  const [solBalance, setSolBalance] = useState<number>(0);

  const fetchData = async (walletAddress: string) => {
    setLoading(true);
    try {
      const fetchedUser = await checkOrCreateAccount(walletAddress);
      setUser(fetchedUser);

      const fetchedTokens = await fetchWalletTokens(walletAddress);
      setTokens(fetchedTokens);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTransactions = async (walletAddress: string) => {
    setLoading(true);
    try {
      const fetchedTransactions = await getAllTransactions(walletAddress);
  
      setTransactions(fetchedTransactions);
  
      // Calculate transaction summary
      const totalSent = fetchedTransactions
        .filter((txn) => txn.sender_wallet_address === walletAddress)
        .reduce((sum, txn) => sum + txn.amount, 0);
  
      const totalReceived = fetchedTransactions
        .filter((txn) => txn.receiver_wallet_address === walletAddress)
        .reduce((sum, txn) => sum + txn.amount, 0);
  
      const totalAmount = totalSent + totalReceived;
  
      // Calculate total number of sent and received transactions
      const totalSentCount = fetchedTransactions.filter(
        (txn) => txn.sender_wallet_address === walletAddress
      ).length;
  
      const totalReceivedCount = fetchedTransactions.filter(
        (txn) => txn.receiver_wallet_address === walletAddress
      ).length;
  
      // Set transaction summary with counts
      setTransactionSummary({
        totalSent,
        totalReceived,
        totalAmount,
        totalSentCount,
        totalReceivedCount,
      });
    } catch (error) {
      console.error("Error fetching all transactions:", error);
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
      console.error("Error fetching SOL balance:", error);
      throw new Error("Failed to fetch SOL balance");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        tokens,
        transactions,
        transactionSummary,
        loading,
        fetchData,
        fetchAllTransactions,
        sendTip,
        getSolBalance,
        solBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
