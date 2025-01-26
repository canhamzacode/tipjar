import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

/**
 * Fetches tokens in a Solana wallet.
 * 
 * @param walletAddress - The public address of the wallet to fetch tokens for.
 * @param rpcUrl - (Optional) The RPC endpoint to connect to. Defaults to the Solana mainnet.
 * @returns An array of tokens with their mint addresses, balances, and decimals.
 */
export const fetchWalletTokens = async (
  walletAddress: string,
  rpcUrl: string = clusterApiUrl('devnet')
) => {
  try {
    // Validate the wallet address
    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    const connection = new Connection(rpcUrl);

    // Fetch all token accounts for the wallet
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(walletAddress),
      {
        programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
      }
    );

    // Extract token data
    const tokens = tokenAccounts.value.map((accountInfo) => {
      const tokenAmount = accountInfo.account.data.parsed.info.tokenAmount;
      const mintAddress = accountInfo.account.data.parsed.info.mint;

      return {
        mintAddress,
        balance: tokenAmount.uiAmount || 0,
        decimals: tokenAmount.decimals,
      };
    });

    return tokens;
  } catch (error) {
    console.error('Error fetching wallet tokens:', error);
    throw error;
  }
};
