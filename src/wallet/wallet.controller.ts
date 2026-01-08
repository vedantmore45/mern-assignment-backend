import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AmountDto } from './dto/amount.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('balance')
  getBalance(@Query('userId') userId: string) {
    // Validate userId exists and throw if not found (improves error clarity)
    return {
      balance: this.walletService.getBalance(userId),
    };
  }

  @Post('credit')
  credit(@Body() body: AmountDto) {
      // DTO exists but requires class-validator decorators for runtime validation
    // Ensures amount > 0 and userId is provided
    return {
      balance: this.walletService.credit(body.userId, body.amount),
    };
  }

  @Post('debit')
  debit(@Body() body: AmountDto) {
    // Debit should validate amount before calling service
    // Service will throw on insufficient balance
    return {
      balance: this.walletService.debit(body.userId, body.amount),
    };
  }
}
