"use client";
import React, { useState } from "react";
import { TipButtons } from "../TipButton";
import { useUser } from "@/context/userContext";
import { CustomModal } from "../Modal";
import { TipStatsCard } from "../TipStatsCard";
import { TipForm } from "../TipModal";
import { useAppKitAccount } from "@reown/appkit/react";
import { sendTipToDb } from "@/utils";

const TipStatistics = () => {
  const { solBalance, sendTip, transactionSummary } = useUser();
  const [modal, setModal] = useState({ open: false, type: "" });
  const [loading, setLoading] = useState(false);
  const { address: senderAddress, } = useAppKitAccount();

  const closeModal = () => setModal({ ...modal, open: false });

  const handleTipSubmit = async (formData: { walletAddress: string; amount: string; message?: string }) => {
    const { walletAddress, amount, message } = formData;

    if (!walletAddress || !amount || isNaN(Number(amount)) || !senderAddress) {
      alert("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const usdcAmount = Number(amount);
      const signature = await sendTip(walletAddress, usdcAmount);
      console.log("Transaction successful! Signature:", signature);
      alert(`Tip sent successfully! Transaction Hash: ${signature}`);

      console.log(usdcAmount);
      await sendTipToDb(senderAddress, walletAddress, usdcAmount, message || null, signature);
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
          <p>Total SOL Balance: {solBalance}</p>
        </div>
        <TipButtons onClick={() => setModal({ open: true, type: "send-tips" })} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <TipStatsCard
          title="Tips Sent"
          value={`${transactionSummary?.totalSent || 0} Sol`}
          gradientFrom="from-purple-600"
          gradientTo="to-blue-500"
        />
        <TipStatsCard
          title="Tips Received"
          value={`${transactionSummary?.totalReceived || 0} Sol`}
          gradientFrom="from-purple-600"
          gradientTo="to-blue-500"
        />
        <TipStatsCard
          title="Total No Tipped"
          value={`${transactionSummary?.totalSentCount || 0}`}
          gradientFrom="from-purple-600"
          gradientTo="to-blue-500"
        />
        <TipStatsCard
          title="Total Received"
          value={`${transactionSummary?.totalReceivedCount || 0}`}
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
