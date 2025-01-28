import { ITransaction } from '../../types';
import supabase from './supabase';

export const sendTipToDb = async (
  senderAddress: string,
  receiverAddress: string,
  amount: number,
  message: string | null,
  transactionHash: string
): Promise<ITransaction | null> => {
  try {
    const { data: transaction, error: txnError } = await supabase
      .from('transactions')
      .insert([
        {
          sender_wallet_address: senderAddress,
          receiver_wallet_address: receiverAddress,
          amount,
          message,
          transaction_hash: transactionHash,
        },
      ])
      .single();

    if (txnError) {
      console.error('Error inserting transaction:', txnError);
      return null;
    }

    return transaction;

  } catch (error) {
    console.error('Unexpected error in sendTipToDb:', error);
    return null;
  }
};




export const getUserTotalSent = async (userAddress: string) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('amount')
    .eq('sender_wallet_address', userAddress);

  if (error) {
    console.error('Error fetching total sent:', error);
    return 0;
  }

  const totalSent = data.reduce((total, txn) => total + txn.amount, 0);
  return totalSent;
};

export const getUserTotalReceived = async (userAddress: string) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('amount')
    .eq('receiver_wallet_address', userAddress);

  if (error) {
    console.error('Error fetching total received:', error);
    return 0;
  }

  const totalReceived = data.reduce((total, txn) => total + txn.amount, 0);
  return totalReceived;
};
