import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class QuestionsService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('NEXT_PUBLIC_SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE');

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase credentials not found. Quiz backend might not work correctly.');
    }

    this.supabase = createClient(supabaseUrl || '', supabaseKey || '');
  }

  async getQuestions(category?: string, limit: number = 10) {
    let query = this.supabase
      .from('questions')
      .select('id, category, difficulty, question, correct_answer, incorrect_answers');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.limit(limit);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    // Shuffle options for the frontend
    return data.map(q => {
      const options = [q.correct_answer, ...q.incorrect_answers];
      // Basic Fisher-Yates shuffle
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      return {
        id: q.id,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        options,
        correct_answer: q.correct_answer, // Including for now, ideally backend shouldn't send it until answered
      };
    });
  }

  async getCategories() {
    const { data, error } = await this.supabase
      .from('questions')
      .select('category');

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    const categories = [...new Set(data.map(d => d.category))];
    return categories;
  }
}
