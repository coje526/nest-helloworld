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
exports.StockedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const priority_type_1 = require("../type/priority.type");
class StockedDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 17,
        description: '工單 index',
    }),
    __metadata("design:type", Number)
], StockedDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '工單號碼',
    }),
    __metadata("design:type", String)
], StockedDto.prototype, "serialNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '商品品號',
    }),
    __metadata("design:type", String)
], StockedDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '0',
        enum: priority_type_1.StockedPriority,
        description: `<br>工單生產狀態:</br>
        <br>0 => 未開始(UnProduction)</br>
        <br>1 => 生產中(InProduction)</br>
        <br>2 => 暫停(Suspend)</br>
        <br>3 => 已完成(Completed)</br>
        <br>4 => 未完成(Incomplete)</br>`,
    }),
    __metadata("design:type", String)
], StockedDto.prototype, "productionStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '2000',
        description: '預計生產數量',
    }),
    __metadata("design:type", String)
], StockedDto.prototype, "purchaseQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '1000',
        description: '已生產數量',
    }),
    __metadata("design:type", String)
], StockedDto.prototype, "producedQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '0.00',
        description: '預計生產重量',
    }),
    __metadata("design:type", String)
], StockedDto.prototype, "purchaseWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '0.00',
        description: '已生產重量',
    }),
    __metadata("design:type", String)
], StockedDto.prototype, "producedWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-02-01',
        description: '預計完工日',
    }),
    __metadata("design:type", String)
], StockedDto.prototype, "estimatedCompletionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-02-01',
        description: '預計交貨日',
    }),
    __metadata("design:type", String)
], StockedDto.prototype, "estimatedDeliveryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-02-01',
        description: '實際完工日',
    }),
    __metadata("design:type", String)
], StockedDto.prototype, "realCompletionDate", void 0);
exports.StockedDto = StockedDto;
//# sourceMappingURL=stocked.dto.js.map