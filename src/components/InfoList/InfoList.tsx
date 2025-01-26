"use client";

import { useEffect } from "react";
import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
} from "@reown/appkit/react";
import { WalletTokenList } from "../WalletTokenList";

const InfoList = () => {
  const kitTheme = useAppKitTheme();
  const state = useAppKitState();
  const { address, caipAddress, isConnected, embeddedWalletInfo } = useAppKitAccount();
  const events = useAppKitEvents();
  const walletInfo = useWalletInfo();

  useEffect(() => {
    console.log("AppKit Events: ", events);
  }, [events]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-gray-900 text-white rounded-lg shadow-lg space-y-6">
      <WalletTokenList walletAddress={address || ""} />
      <section>
        <h2 className="text-xl font-bold mb-2">Wallet Information</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p>
            <span className="font-medium">Address:</span> {address || "Not connected"}
          </p>
          <p>
            <span className="font-medium">CAIP Address:</span> {caipAddress || "Not available"}
          </p>
          <p>
            <span className="font-medium">Connected:</span> {isConnected ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-medium">Account Type:</span> {embeddedWalletInfo?.accountType || "N/A"}
          </p>
          {embeddedWalletInfo?.user?.email && (
            <p>
              <span className="font-medium">Email:</span> {embeddedWalletInfo.user.email}
            </p>
          )}
          {embeddedWalletInfo?.user?.username && (
            <p>
              <span className="font-medium">Username:</span> {embeddedWalletInfo.user.username}
            </p>
          )}
        </div>
      </section>

      {/* Theme Information */}
      <section>
        <h2 className="text-xl font-bold mb-2">Theme</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p>
            <span className="font-medium">Current Theme:</span> {kitTheme.themeMode || "Default"}
          </p>
        </div>
      </section>

      {/* AppKit State */}
      <section>
        <h2 className="text-xl font-bold mb-2">App State</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p>
            <span className="font-medium">Active Chain:</span> {state.activeChain || "Not available"}
          </p>
          <p>
            <span className="font-medium">Loading:</span> {state.loading ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-medium">Modal Open:</span> {state.open ? "Yes" : "No"}
          </p>
        </div>
      </section>

      {/* WalletInfo */}
      <section>
        <h2 className="text-xl font-bold mb-2">Wallet Details</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p>
            <span className="font-medium">Wallet Name:</span>{" "}
            {walletInfo.walletInfo?.name?.toString() || "Not available"}
          </p>
        </div>
      </section>
    </div>
  );
};

export default InfoList;
