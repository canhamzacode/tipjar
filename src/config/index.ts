import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'


// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694"

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [solana, solanaTestnet, solanaDevnet] as [AppKitNetwork, ...AppKitNetwork[]]

// Set up Solana Adapter
export const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
})


import { Connection, clusterApiUrl } from "@solana/web3.js";

export const SOLANA_CLUSTER = "devnet"; // Change to "mainnet-beta" or "testnet" when needed

export const connection = new Connection(clusterApiUrl(SOLANA_CLUSTER));

export const SOLANA_EXPLORER_URL = `https://explorer.solana.com/tx/{transactionHash}?cluster=${SOLANA_CLUSTER}`;
