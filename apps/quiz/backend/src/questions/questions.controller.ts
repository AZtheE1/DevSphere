import { Controller, Get, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  getQuestions(
    @Query('category') category?: string,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.questionsService.getQuestions(category, limitNum);
  }

  @Get('categories')
  getCategories() {
    return this.questionsService.getCategories();
  }
}
