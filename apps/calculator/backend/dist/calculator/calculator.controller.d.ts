import { CalculatorService } from './calculator.service';
import { CreateHistoryDto } from './dto/create-history.dto';
export declare class CalculatorController {
    private readonly calculatorService;
    constructor(calculatorService: CalculatorService);
    getHistory(req: any): Promise<any[]>;
    createHistory(req: any, dto: CreateHistoryDto): Promise<any>;
    clearHistory(req: any): Promise<{
        success: boolean;
    }>;
}
