"use client";
import React, { useState } from "react";
import { TipButtons } from "../TipButton";
import { useUser } from "@/context/userContext";
import { CustomModal } from "../Modal";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { sendTipToBlockchain } from "@/utils/sendTipToBlockchain";
import { WalletProvider } from "../../../types";
import { TipStatsCard } from "../TipStatsCard";
import { TipForm } from "../TipModal";

const TipStatistics = () => {
  const { user, tokens } = useUser();
  const [modal, setModal] = useState({ open: false, type: "" });
  const connection = new Connection(clusterApiUrl("devnet"));
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<WalletProvider>("solana");

  const closeModal = () => setModal({ ...modal, open: false });

  const handleTipSubmit = async (formData: { walletAddress: string; amount: string }) => {
    const { walletAddress, amount } = formData;

    if (!walletAddress || !amount || isNaN(Number(amount))) {
      alert("Please fill in all fields correctly.");
      return;
    }

    if (!address || !isConnected || !walletProvider) {
      alert("Please connect your wallet.");
      return;
    }

    setLoading(true);
    try {
      const usdcAmount = Number(amount);
      const signature = await sendTipToBlockchain(
        connection,
        walletAddress,
        usdcAmount,
        address,
        walletProvider
      );
      console.log("Transaction successful! Signature:", signature);
      alert(`Tip sent successfully! Transaction Hash: ${signature}`);
      closeModal();
    } catch (error) {
      console.error("Error sending tip:", error);
      alert("Failed to send the tip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white text-black shadow-lg rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tip Dashboard</h2>
          <p>Total No Of Sol {tokens.map((token)=> (
            <div key={token.mintAddress}>
              {token.balance}
              {token.mintAddress}
            </div>
          ))}</p>
        </div>
        <TipButtons onClick={() => setModal({ open: true, type: "send-tips" })} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <TipStatsCard
          title="Tips Sent"
          value={user?.total_sent || 0}
          gradientFrom="from-purple-600"
          gradientTo="to-blue-500"
        />
        <TipStatsCard
          title="Tips Received"
          value={user?.total_received || 0}
          gradientFrom="from-purple-600"
          gradientTo="to-blue-500"
        />
        <TipStatsCard
          title="Total Tipped"
          value={`$${user?.total_tips_sent || 0}`}
          gradientFrom="from-purple-600"
          gradientTo="to-blue-500"
        />
        <TipStatsCard
          title="Total Received"
          value={`$${user?.total_tips_received || 0}`}
          gradientFrom="from-purple-600"
          gradientTo="to-blue-500"
        />
      </div>
      <CustomModal show={modal.open} onDismiss={closeModal} title="Send Tips">
        <TipForm onSubmit={handleTipSubmit} loading={loading} />
      </CustomModal>
    </div>
  );
};

export default TipStatistics;
