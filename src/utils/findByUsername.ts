import supabase from "./supabase";

export const getWalletAddressByUsername = async (username: string): Promise<string | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('wallet_address')
      .eq('username', username)
      .single();
  
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  
    return data ? data.wallet_address : null;
};
