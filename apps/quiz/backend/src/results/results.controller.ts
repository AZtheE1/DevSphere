import { Controller, Post, Get, Body, UseGuards, Request, Query } from '@nestjs/common';
import { ResultsService, SubmitScoreDto } from './results.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  submitScore(@Request() req: any, @Body() body: SubmitScoreDto) {
    return this.resultsService.submitScore(req.user.id, body);
  }

  @Get('leaderboard')
  getLeaderboard(@Query('category') category?: string) {
    return this.resultsService.getLeaderboard(category);
  }
}
