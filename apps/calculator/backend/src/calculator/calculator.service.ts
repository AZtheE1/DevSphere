import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreateHistoryDto } from './dto/create-history.dto';

@Injectable()
export class CalculatorService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')!
    );
  }

  async getHistory(userId: string) {
    const { data, error } = await this.supabase
      .schema('calculator')
      .from('history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async createHistory(userId: string, dto: CreateHistoryDto) {
    const { data, error } = await this.supabase
      .schema('calculator')
      .from('history')
      .insert({
        user_id: userId,
        expression: dto.expression,
        result: dto.result,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async clearHistory(userId: string) {
    const { error } = await this.supabase
      .schema('calculator')
      .from('history')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    return { success: true };
  }
}
