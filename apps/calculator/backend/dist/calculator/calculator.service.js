"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
let CalculatorService = class CalculatorService {
    configService;
    supabase;
    constructor(configService) {
        this.configService = configService;
        this.supabase = (0, supabase_js_1.createClient)(this.configService.get('SUPABASE_URL'), this.configService.get('SUPABASE_SERVICE_ROLE_KEY'));
    }
    async getHistory(userId) {
        const { data, error } = await this.supabase
            .schema('calculator')
            .from('history')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    }
    async createHistory(userId, dto) {
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
        if (error)
            throw error;
        return data;
    }
    async clearHistory(userId) {
        const { error } = await this.supabase
            .schema('calculator')
            .from('history')
            .delete()
            .eq('user_id', userId);
        if (error)
            throw error;
        return { success: true };
    }
};
exports.CalculatorService = CalculatorService;
exports.CalculatorService = CalculatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CalculatorService);
//# sourceMappingURL=calculator.service.js.map