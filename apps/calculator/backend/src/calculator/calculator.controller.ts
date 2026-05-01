import { Controller, Get, Post, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CalculatorService } from './calculator.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('calculator')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get('history')
  @ApiOperation({ summary: 'Get calculation history' })
  getHistory(@Request() req: any) {
    return this.calculatorService.getHistory(req.user.id);
  }

  @Post('history')
  @ApiOperation({ summary: 'Add calculation to history' })
  createHistory(@Request() req: any, @Body() dto: CreateHistoryDto) {
    return this.calculatorService.createHistory(req.user.id, dto);
  }

  @Delete('history')
  @ApiOperation({ summary: 'Clear calculation history' })
  clearHistory(@Request() req: any) {
    return this.calculatorService.clearHistory(req.user.id);
  }
}
