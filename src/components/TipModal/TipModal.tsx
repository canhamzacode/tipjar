"use client";
import React, { useState } from "react";

interface TipFormProps {
  onSubmit: (formData: { walletAddress: string; amount: string }) => void;
  loading: boolean;
}

const TipForm: React.FC<TipFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    walletAddress: "",
    amount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { walletAddress, amount } = formData;
    onSubmit({ walletAddress, amount });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Wallet Address</label>
        <input
          type="text"
          name="walletAddress"
          value={formData.walletAddress}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter wallet address"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount in USD</label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter amount in USD"
        />
      </div>
      <button
        onClick={handleSubmit}
        className={`px-4 py-2 bg-green-600 text-white rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "Sending Tip..." : "Send Tip"}
      </button>
    </div>
  );
};

export default TipForm;