import {  ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import {  StockedPriority } from '../type/priority.type';
import {  StockedRecordDto } from './stocked-record.dto';
import {  DetailProduct } from './stocked-detail-product.dto';

@ApiExtraModels(StockedRecordDto)
@ApiExtraModels(DetailProduct)


export class StockedDetailDto {
  
      @ApiProperty({
        description: '工單號碼',
      })
      dispatchId: string;
    
      @ApiProperty({
        description: '工單號碼',
      })
      serialNum: string;

      @ApiProperty({
        description: '商品資料',
        allOf:[
            { $ref: getSchemaPath(DetailProduct) },
        ]
      })
      product: string;
     
      @ApiProperty({
        default: '0',
        enum: StockedPriority,
        description:`<br>工單生產狀態:</br>
        <br>0 => 未開始(UnProduction)</br>
        <br>1 => 生產中(InProduction)</br>
        <br>2 => 暫停(Suspend)</br>
        <br>3 => 已完成(Completed)</br>
        <br>4 => 未完成(Incomplete)</br>`,
      })
      productionStatus: string; StockedPriority;

      @ApiProperty({
        default:'5000',
        description: '預計生產數量',
      })
      purchaseQuantity: string;

      @ApiProperty({
        default:'3500',
        description: '已生產數量',
      })
      producedQuantity: string;

      @ApiProperty({
        default:'1500',
        description: '未完成數量',
      })
      unProducedQuantity: string;

      @ApiProperty({
        default:'0.00',
        description: '已入庫數量',
      })
      stockedQuantity: string;

      @ApiProperty({
        default:'0',
        description: '已完成未入庫數量',
      })
      unStockedQuantity: string;

      @ApiProperty({
        default:'0.00',
        description: '預計生產重量',
      })
      purchaseWeight: string;

      @ApiProperty({
        default:'0.00',
        description: '已生產重量',
      })
      producedWeight: string;

      @ApiProperty({
        default:'0.00',
        description: '未完成重量',
      })
      unProducedWeight: string;

      @ApiProperty({
        default:'0.00',
        description: '已入庫重量',
      })
      stockedWeight: string;

      @ApiProperty({
        default:'0.00',
        description: '已完成未入庫重量',
      })
      unStockedWeight: string;

      @ApiProperty({
        example:'2023-02-01',
        description: '預計完工日',
      })
      estimatedCompletionDate: string;

      @ApiProperty({
        example:'2023-02-01',
        description: '預計交貨日',
      })
      estimatedDeliveryDate: string;

      @ApiProperty({
        description: '入庫歷史紀錄',
        allOf:[
            { $ref: getSchemaPath(StockedRecordDto) },
        ],

      })
      record: string;

}