import { ConfigService } from '@nestjs/config';
import { CreateHistoryDto } from './dto/create-history.dto';
export declare class CalculatorService {
    private configService;
    private supabase;
    constructor(configService: ConfigService);
    getHistory(userId: string): Promise<any[]>;
    createHistory(userId: string, dto: CreateHistoryDto): Promise<any>;
    clearHistory(userId: string): Promise<{
        success: boolean;
    }>;
}
