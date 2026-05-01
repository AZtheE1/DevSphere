import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class SubmitScoreDto {
  score: number;
  total_questions: number;
  category: string;
}

@Injectable()
export class ResultsService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('NEXT_PUBLIC_SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE');

    this.supabase = createClient(supabaseUrl || '', supabaseKey || '');
  }

  async submitScore(userId: string, data: SubmitScoreDto) {
    const { error } = await this.supabase
      .from('results')
      .insert({
        user_id: userId,
        score: data.score,
        total_questions: data.total_questions,
        category: data.category,
      });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return { success: true };
  }

  async getLeaderboard(category?: string) {
    let query = this.supabase
      .from('results')
      .select('score, total_questions, category, completed_at, user_id') // We might want to join with profiles later
      .order('score', { ascending: false })
      .limit(10);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }
}
