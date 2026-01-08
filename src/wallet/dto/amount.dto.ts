import { IsString, IsNumber, Min } from 'class-validator';

export class AmountDto {
  // TypeScript-only typing: does NOT perform runtime validation.
  // Must add class-validator decorators (e.g., @IsNumber(), @Min(1)) for real validation.
  @IsString()
  userId: string;

  @IsNumber()
  @Min(1)
  // Should validate amount > 0 to prevent invalid operations
  amount: number;
}