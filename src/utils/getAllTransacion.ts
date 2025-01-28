import { ITransaction } from '../../types';
import supabase from './supabase';

export const getAllTransactions = async (walletAddress: string): Promise<ITransaction[]> => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .or(`sender_wallet_address.eq.${walletAddress},receiver_wallet_address.eq.${walletAddress}`);

    if (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error in getAllTransactions:', error);
    return [];
  }
};
