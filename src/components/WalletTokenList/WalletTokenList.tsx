"use client";

import { fetchWalletTokens } from "@/utils";
import React, { useEffect, useState } from "react";
import { IToken } from "../../../types";

const WalletTokenList = ({ walletAddress }: { walletAddress: string }) => {
  const [tokens, setTokens] = useState<IToken[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTokens = async () => {
      try {
        setLoading(true);
        const fetchedTokens = await fetchWalletTokens(walletAddress);
        setTokens(fetchedTokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    if (walletAddress) {
      getTokens();
    }
  }, [walletAddress]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Loading tokens...
        </p>
      </div>
    );

  if (!walletAddress)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500 text-lg font-medium">
          No wallet address provided.
        </p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Tokens in Wallet
      </h2>
      {tokens.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.map((token, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-sm text-gray-500 mb-2">
                <strong>Mint Address:</strong>
                <span className="block text-gray-800 truncate">
                  {token.mintAddress}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Balance:</strong>{" "}
                <span className="font-medium text-gray-800">
                  {token.balance}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Decimals:</strong>{" "}
                <span className="font-medium text-gray-800">
                  {token.decimals}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg font-medium">
            No tokens found in this wallet.
          </p>
        </div>
      )}
    </div>
  );
};

export default WalletTokenList;
