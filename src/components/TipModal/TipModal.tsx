"use client";
import { getWalletAddressByUsername } from "@/utils";
import React, { useState } from "react";

interface TipFormProps {
  onSubmit: (formData: { walletAddress: string; amount: string; message?: string }) => void;
  loading: boolean;
}

const TipForm: React.FC<TipFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    username: "",
    walletAddress: "",
    amount: "",
    message: "", // Added message field
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showUsernameSearch, setShowUsernameSearch] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    if (!formData.username) {
      setSearchError("Please enter a username.");
      return;
    }

    setSearchLoading(true);
    setSearchError(null);

    try {
      const walletAddress = await getWalletAddressByUsername(formData.username);

      if (walletAddress) {
        setFormData((prev) => ({ ...prev, walletAddress }));
      } else {
        setSearchError("User not found.");
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setSearchError("Failed to fetch user details.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSubmit = () => {
    const { walletAddress, amount, message } = formData;

    if (!walletAddress || !amount || isNaN(Number(amount))) {
      alert("Please fill in all fields correctly.");
      return;
    }

    onSubmit({ walletAddress, amount, message: message || undefined }); // Include message
  };

  return (
    <div>
      {/* Toggle Button for Username Search */}
      <button
        type="button"
        onClick={() => setShowUsernameSearch((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        {showUsernameSearch ? "Enter Wallet Address Directly" : "Search by Username"}
      </button>

      {/* Username Search Section */}
      {showUsernameSearch && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Search by Username</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Enter username"
            />
            <button
              onClick={handleSearch}
              className={`mt-1 px-4 py-2 bg-indigo-600 text-white rounded-lg ${
                searchLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={searchLoading}
            >
              {searchLoading ? "Searching..." : "Search"}
            </button>
          </div>
          {searchError && <p className="text-red-500 text-sm mt-1">{searchError}</p>}
        </div>
      )}

      {/* Wallet Address Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Wallet Address</label>
        <input
          type="text"
          name="walletAddress"
          value={formData.walletAddress}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          placeholder="Enter wallet address"
          readOnly={showUsernameSearch}
        />
      </div>

      {/* Amount Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount in USD</label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          placeholder="Enter amount in USD"
        />
      </div>

      {/* Message Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Message (Optional)</label>
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          placeholder="Enter an optional message"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`px-4 py-2 bg-green-600 text-white rounded-lg ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Sending Tip..." : "Send Tip"}
      </button>
    </div>
  );
};

export default TipForm;
