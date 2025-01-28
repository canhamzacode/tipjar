"use client";
import React, { useState } from "react";
import { TipButtons } from "../TipButton";
import { useUser } from "@/context/userContext";
import { CustomModal } from "../Modal";
import { TipStatsCard } from "../TipStatsCard";
import { TipForm } from "../TipModal";
import { useAppKitAccount } from "@reown/appkit/react";
import { sendTipToDb } from "@/utils";
import { Toast } from "../Toast";

const TipStatistics = () => {
  const { solBalance, sendTip, transactionSummary, fetchData, getSolBalance, fetchAllTransactions, user } = useUser();
  const [modal, setModal] = useState<{ open: boolean; type: "send-tips" | "receive-tips" }>({
    open: false,
    type: "send-tips",
  });
  const [loading, setLoading] = useState(false);
  const { address: senderAddress } = useAppKitAccount();

  const closeModal = () => setModal({ ...modal, open: false });

  const handleTipSubmit = async (formData: { walletAddress: string; amount: string; message?: string }) => {
    const { walletAddress, amount, message } = formData;

    if(!walletAddress) {
      Toast("error", "Pls Connect Your Wallet");
      return;
    }

    if (!amount || isNaN(Number(amount)) || !senderAddress) {
      Toast("error","Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const usdcAmount = Number(amount);
      const signature = await sendTip(walletAddress, usdcAmount);
      
      await sendTipToDb(senderAddress, walletAddress, usdcAmount, message || null, signature);
      
      await Promise.all([
        fetchData(senderAddress),
        getSolBalance(senderAddress),
        fetchAllTransactions(senderAddress),
      ]);
      Toast("success",`Tip sent successfully! Transaction Hash: ${signature}`);
      
      closeModal();
    } catch (error) {
      console.log("Error sending tip:", error);
      Toast("error", "Failed to send the tip. Please try again.");
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
        <TipButtons
          sendTip={() => setModal({ open: true, type: "send-tips" })}
          receiveTip={() => setModal({ open: true, type: "receive-tips" })}
        />
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
      <CustomModal show={modal.open} onDismiss={closeModal} title={modal.type === "send-tips" ? "Send Tips" : "Receive Tips"}>
        {modal.type === "send-tips" ? (
          <TipForm onSubmit={handleTipSubmit} loading={loading} />
        ) : (
          <div>
            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
              <p className="mb-2 text-gray-700">
                <span className="font-semibold">Tip Message:</span>
                <br />
                {`Visit ${window.location.origin} and send a tip to the username: ${user?.username || "your username here"}`}
              </p>
              <button
                onClick={() => {
                  const tipMessage = `Visit ${window.location.origin} and send a tip to the username: ${user?.username || "your username here"}`;

                  navigator.clipboard
                    .writeText(tipMessage)
                    .then(() => {
                      Toast("success","The tip message has been copied to the clipboard!");
                    })
                    .catch((error) => {
                      Toast("error",`Failed to copy the message: ${error.message}`);
                    });
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Copy Tip Message
              </button>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
};

export default TipStatistics;
