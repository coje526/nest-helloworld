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
exports.StockedDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const priority_type_1 = require("../type/priority.type");
const stocked_record_dto_1 = require("./stocked-record.dto");
const stocked_detail_product_dto_1 = require("./stocked-detail-product.dto");
let StockedDetailDto = class StockedDetailDto {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '工單號碼',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "dispatchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '工單號碼',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "serialNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '商品資料',
        allOf: [
            { $ref: (0, swagger_1.getSchemaPath)(stocked_detail_product_dto_1.DetailProduct) },
        ]
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "product", void 0);
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
], StockedDetailDto.prototype, "productionStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '5000',
        description: '預計生產數量',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "purchaseQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '3500',
        description: '已生產數量',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "producedQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '1500',
        description: '未完成數量',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "unProducedQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '0.00',
        description: '已入庫數量',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "stockedQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '0',
        description: '已完成未入庫數量',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "unStockedQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '0.00',
        description: '預計生產重量',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "purchaseWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '0.00',
        description: '已生產重量',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "producedWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '0.00',
        description: '未完成重量',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "unProducedWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '0.00',
        description: '已入庫重量',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "stockedWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: '0.00',
        description: '已完成未入庫重量',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "unStockedWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-02-01',
        description: '預計完工日',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "estimatedCompletionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-02-01',
        description: '預計交貨日',
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "estimatedDeliveryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '入庫歷史紀錄',
        allOf: [
            { $ref: (0, swagger_1.getSchemaPath)(stocked_record_dto_1.StockedRecordDto) },
        ],
    }),
    __metadata("design:type", String)
], StockedDetailDto.prototype, "record", void 0);
StockedDetailDto = __decorate([
    (0, swagger_1.ApiExtraModels)(stocked_record_dto_1.StockedRecordDto),
    (0, swagger_1.ApiExtraModels)(stocked_detail_product_dto_1.DetailProduct)
], StockedDetailDto);
exports.StockedDetailDto = StockedDetailDto;
//# sourceMappingURL=stocked-detail.dto.js.map