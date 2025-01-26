export interface IToken {
    mintAddress: string;
    balance: string;
    decimals: string;
}

export interface IUser {
    id: number;
    username: string;
    wallet_address: string;
    total_received: number;
    total_sent: number;
    total_tips_received: number;
    total_tips_sent: number;
    created_at: string;
    updated_at: string;
}
  
export interface ITransaction {
    id: number;
    sender_wallet_address: string;
    receiver_wallet_address: string;
    amount: number;
    message: string | null;
    transaction_hash: string;
    created_at: string;
}
  