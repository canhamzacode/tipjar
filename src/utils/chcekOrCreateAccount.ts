import { IUser } from '../../types';
import supabase from './supabase';

export const checkOrCreateAccount = async (walletAddress: string): Promise<IUser | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

  if (!data) {
    const username = walletAddress.substring(0, 8);

    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([{ wallet_address: walletAddress, username }])
      .single();

    if (createError) {
      console.error('Error creating user:', createError);
      return null;
    }

    return newUser;
  }

  if (error) {
    console.log("Error", error)
  }

  return data;
};
