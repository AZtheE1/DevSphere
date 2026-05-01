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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const calculator_service_1 = require("./calculator.service");
const create_history_dto_1 = require("./dto/create-history.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let CalculatorController = class CalculatorController {
    calculatorService;
    constructor(calculatorService) {
        this.calculatorService = calculatorService;
    }
    getHistory(req) {
        return this.calculatorService.getHistory(req.user.id);
    }
    createHistory(req, dto) {
        return this.calculatorService.createHistory(req.user.id, dto);
    }
    clearHistory(req) {
        return this.calculatorService.clearHistory(req.user.id);
    }
};
exports.CalculatorController = CalculatorController;
__decorate([
    (0, common_1.Get)('history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get calculation history' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CalculatorController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Post)('history'),
    (0, swagger_1.ApiOperation)({ summary: 'Add calculation to history' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_history_dto_1.CreateHistoryDto]),
    __metadata("design:returntype", void 0)
], CalculatorController.prototype, "createHistory", null);
__decorate([
    (0, common_1.Delete)('history'),
    (0, swagger_1.ApiOperation)({ summary: 'Clear calculation history' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CalculatorController.prototype, "clearHistory", null);
exports.CalculatorController = CalculatorController = __decorate([
    (0, swagger_1.ApiTags)('calculator'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('calculator'),
    __metadata("design:paramtypes", [calculator_service_1.CalculatorService])
], CalculatorController);
//# sourceMappingURL=calculator.controller.js.map