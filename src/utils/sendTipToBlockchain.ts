import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

interface WalletProvider {
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  sendTransaction: (
    transaction: Transaction,
    connection: Connection
  ) => Promise<string>;
}

export const sendTipToBlockchain = async (
  connection: Connection,
  recipientAddress: string,
  amount: number,
  address: string,
  walletProvider: WalletProvider
): Promise<string> => {
  if (!address) {
    throw new Error("Please connect your wallet.");
  }

  try {
    const lamports = amount * 1000000000;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(address),
        toPubkey: new PublicKey(recipientAddress),
        lamports: lamports,
      })
    );

    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = new PublicKey(address);

    const signedTransaction = await walletProvider.signTransaction(transaction);

    const signature = await walletProvider.sendTransaction(
      signedTransaction,
      connection
    );

    alert("Tip sent successfully!");
    return signature;
  } catch (error) {
    console.error("Error sending tip:", error);
    throw new Error("Failed to send tip.");
  }
};