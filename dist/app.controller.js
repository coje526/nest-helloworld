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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const create_stocked_record_dto_1 = require("./dto/create-stocked-record.dto");
const stocked_dto_1 = require("./dto/stocked.dto");
const stocked_detail_dto_1 = require("./dto/stocked-detail.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getStocksList() {
        return;
    }
    getStocks() {
        return;
    }
    createStockedRecord(data) {
        return this.appService.createStockedRecord(data);
    }
};
__decorate([
    (0, common_1.Get)('api/stocks/list'),
    (0, swagger_1.ApiOperation)({
        description: '取得可編輯入庫資料的工單清單',
    }),
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: '由 api/auth/login 取得',
        required: true,
    }),
    (0, swagger_1.ApiExtraModels)(stocked_dto_1.StockedDto),
    (0, swagger_1.ApiOkResponse)({
        description: '可編輯入庫資料的工單清單',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    description: 'Http status code',
                    example: 200,
                },
                success: {
                    type: 'boolean',
                    description: 'API 處理狀態',
                    example: true,
                },
                message: {
                    type: 'string',
                    description: 'API 回覆訊息',
                    example: 'Get dispatch successes.',
                },
                list: {
                    type: 'array',
                    description: '可輸入入庫資料的工單清單',
                    items: { $ref: (0, swagger_1.getSchemaPath)(stocked_dto_1.StockedDto) }
                },
                total: {
                    type: 'number',
                    description: '清單總筆數',
                    example: '4',
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '工單號碼錯誤導致編輯失敗。',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    description: 'Http status code',
                    example: 400,
                },
                success: {
                    type: 'boolean',
                    description: 'API 處理狀態',
                    example: false,
                },
                message: {
                    type: 'string',
                    description: 'API 回覆訊息',
                    example: 'Cannot find data by this id.',
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getStocksList", null);
__decorate([
    (0, common_1.Get)('api/stocks'),
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: '由 api/auth/login 取得',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'dispatchId',
        type: 'number',
        description: '工單 index',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        description: '取得單一可編輯入庫資料的工單資訊',
    }),
    (0, swagger_1.ApiExtraModels)(stocked_detail_dto_1.StockedDetailDto),
    (0, swagger_1.ApiOkResponse)({
        description: '單一可編輯入庫資料的工單資訊',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    description: 'Http status code',
                    example: 200,
                },
                success: {
                    type: 'boolean',
                    description: 'API 處理狀態',
                    example: true,
                },
                message: {
                    type: 'string',
                    description: 'API 回覆訊息',
                    example: 'Get dispatch successes.',
                },
                detail: {
                    type: 'array',
                    description: '每張工單的入庫細節',
                    $ref: (0, swagger_1.getSchemaPath)(stocked_detail_dto_1.StockedDetailDto),
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '工單號碼錯誤導致編輯失敗。',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    description: 'Http status code',
                    example: 400,
                },
                success: {
                    type: 'boolean',
                    description: 'API 處理狀態',
                    example: false,
                },
                message: {
                    type: 'string',
                    description: 'API 回覆訊息',
                    example: 'Cannot find data by this id.',
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getStocks", null);
__decorate([
    (0, common_1.Post)('api/stocks'),
    (0, swagger_1.ApiHeader)({
        name: 'token',
        description: '由 api/auth/login 取得',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'dispatchId',
        type: 'number',
        description: '工單 index',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        description: '新增單一工單的入庫資訊',
    }),
    (0, swagger_1.ApiExtraModels)(stocked_detail_dto_1.StockedDetailDto),
    (0, swagger_1.ApiOkResponse)({
        description: '編輯成功',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    description: 'Http status code',
                    example: 200,
                },
                success: {
                    type: 'boolean',
                    description: 'API 處理狀態',
                    example: true,
                },
                message: {
                    type: 'string',
                    description: 'API 回覆訊息',
                    example: 'Get dispatch successes.',
                },
                detail: {
                    type: 'array',
                    description: '每張工單的入庫細節',
                    $ref: (0, swagger_1.getSchemaPath)(stocked_detail_dto_1.StockedDetailDto),
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '工單號碼錯誤導致編輯失敗。',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    description: 'Http status code',
                    example: 400,
                },
                success: {
                    type: 'boolean',
                    description: 'API 處理狀態',
                    example: false,
                },
                message: {
                    type: 'string',
                    description: 'API 回覆訊息',
                    example: 'Cannot find data by this id.',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stocked_record_dto_1.CreateStockedRecord]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createStockedRecord", null);
AppController = __decorate([
    (0, swagger_1.ApiBasicAuth)(),
    (0, swagger_1.ApiTags)('stock'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map