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
    // 1. Insert transaction record
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

    // 2. Update sender's stats
    const { error: senderError } = await supabase
      .from('users')
      .update({
        total_sent: supabase.rpc('increment_field', { field_name: 'total_sent', amount }),
        total_tips_sent: supabase.rpc('increment_field', { field_name: 'total_tips_sent', amount: 1 }),
      })
      .eq('wallet_address', senderAddress);

    if (senderError) {
      console.error('Error updating sender stats:', senderError);
    }

    // 3. Update receiver's stats
    const { error: receiverError } = await supabase
      .from('users')
      .update({
        total_received: supabase.rpc('increment_field', { field_name: 'total_received', amount }),
        total_tips_received: supabase.rpc('increment_field', { field_name: 'total_tips_received', amount: 1 }),
      })
      .eq('wallet_address', receiverAddress);

    if (receiverError) {
      console.error('Error updating receiver stats:', receiverError);
    }

    return transaction;
  } catch (error) {
    console.error('Unexpected error in sendTip:', error);
    return null;
  }
};
