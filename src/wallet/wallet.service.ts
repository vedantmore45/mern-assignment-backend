import { Injectable, BadRequestException } from '@nestjs/common';

type Wallet = {
  userId: string;
  balance: number;
};

const wallets: Record<string, Wallet> = {
  u1: { userId: 'u1', balance: 100 },
};

@Injectable()
export class WalletService {

  private getWalletOrThrow(userId: string): Wallet {
    // Centralized validation: avoid repeating wallet existence checks
    const wallet = wallets[userId];
    if (!wallet) throw new BadRequestException('Wallet not found');
    return wallet;
  }

  getBalance(userId: string) {
    // Previously returned 0 for non-existing users (misleading)
    const wallet = this.getWalletOrThrow(userId);
    return wallet.balance;
  }

  credit(userId: string, amount: number) {
    // Validate amount > 0 to prevent invalid credits
    if (amount <= 0) throw new BadRequestException('Invalid amount');
    
    const wallet = this.getWalletOrThrow(userId);

    // Safe update since wallet is now guaranteed to exist
    wallet.balance += amount;
    return wallet.balance;
  }

  debit(userId: string, amount: number) {
    // Validate amount > 0 to avoid negative/zero debit operations
    if (amount <= 0) throw new BadRequestException('Invalid amount');
    
    const wallet = this.getWalletOrThrow(userId);
    
    // Check balance before subtraction to avoid negative wallet states
    if (wallet.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    wallet.balance -= amount;
    return wallet.balance;
  }
}
