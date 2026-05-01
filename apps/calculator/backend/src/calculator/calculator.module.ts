import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';

@Module({
  imports: [ConfigModule],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
