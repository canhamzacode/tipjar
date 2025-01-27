import * as web3 from '@solana/web3.js';

/**
 * Send SOL from the connected wallet to another wallet.
 * 
 * @param connection - The Solana connection object.
 * @param publicKey - The public key of the sender.
 * @param sendTransaction - The wallet's sendTransaction function.
 * @param recipientAddress - The recipient's public key (base58 string).
 * @param amount - The amount of SOL to send.
 * @returns The transaction signature (txSig) if successful, otherwise throws an error.
 */
export const sendSol = async (
  connection: web3.Connection,
  publicKey: web3.PublicKey,
  sendTransaction: (transaction: web3.Transaction, connection: web3.Connection) => Promise<string>,
  recipientAddress: string,
  amount: number
): Promise<string> => {
  if (!connection || !publicKey) {
    throw new Error('Please connect your wallet.');
  }

  const recipientPublicKey = new web3.PublicKey(recipientAddress);


  const transaction = new web3.Transaction();
  const instruction = web3.SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: recipientPublicKey,
    lamports: amount * web3.LAMPORTS_PER_SOL,
  });

  transaction.add(instruction);

  // Fetch the latest blockhash
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = publicKey;

  // Send the transaction
  const signature = await sendTransaction(transaction, connection);

  await connection.confirmTransaction(signature, 'confirmed');

  return signature;
};