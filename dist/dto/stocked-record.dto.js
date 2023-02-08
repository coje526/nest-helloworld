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
exports.StockedRecordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class StockedRecordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 200.05,
        description: '入庫紀錄 index',
    }),
    __metadata("design:type", Number)
], StockedRecordDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 200.05,
        description: '入庫重量',
    }),
    __metadata("design:type", Number)
], StockedRecordDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 400,
        description: '入庫數量',
    }),
    __metadata("design:type", Number)
], StockedRecordDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "ZB1105-120622",
        description: '生產批號',
    }),
    __metadata("design:type", String)
], StockedRecordDto.prototype, "lotnumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "ZB1105-120622",
        description: '倉儲位編號',
    }),
    __metadata("design:type", String)
], StockedRecordDto.prototype, "storagenumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2023-02-01",
        description: '入庫時間',
    }),
    __metadata("design:type", String)
], StockedRecordDto.prototype, "createAt", void 0);
exports.StockedRecordDto = StockedRecordDto;
//# sourceMappingURL=stocked-record.dto.js.map