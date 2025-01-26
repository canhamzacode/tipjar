
import { ITransaction } from '../../types';
import supabase from './supabase';

// Function to send a tip and log the transaction
export const sendTip = async (
  senderAddress: string,
  receiverAddress: string,
  amount: number,
  message: string | null,
  transactionHash: string
): Promise<ITransaction | null> => {
  // 1. Log the transaction in the Transactions table
  const { data: transaction, error: txnError } = await supabase
    .from('transactions')
    .insert([{ sender_wallet_address: senderAddress, receiver_wallet_address: receiverAddress, amount, message, transaction_hash: transactionHash }])
    .single();

  if (txnError) {
    console.error('Error creating transaction:', txnError);
    return null;
  }

  // 2. Update the sender's total_sent in Users table
  const { data: senderData, error: senderError } = await supabase
    .from('users')
    .update({ total_sent: supabase.raw('total_sent + ?', [amount]), total_tips_sent: supabase.raw('total_tips_sent + 1') })
    .eq('wallet_address', senderAddress);

  if (senderError) {
    console.error('Error updating sender:', senderError);
  }

  // 3. Update the receiver's total_received in Users table
  const { data: receiverData, error: receiverError } = await supabase
    .from('users')
    .update({ total_received: supabase.raw('total_received + ?', [amount]), total_tips_received: supabase.raw('total_tips_received + 1') })
    .eq('wallet_address', receiverAddress);

  if (receiverError) {
    console.error('Error updating receiver:', receiverError);
  }

  return transaction; // Return the transaction object
};
