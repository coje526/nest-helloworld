import {  ApiProperty } from '@nestjs/swagger';
import {  StockedPriority } from '../type/priority.type';

export class StockedDto {
  
    @ApiProperty({
        example: 17,
        description: '工單 index',
      })
      id: number;
    
      @ApiProperty({
        description: '工單號碼',
      })
      serialNum: string;
    
      @ApiProperty({
        description: '商品品號',
      })
      productId: string;

      @ApiProperty({
        default:'0',
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
        default:'2000',
        description: '預計生產數量',
      })
      purchaseQuantity: string;

      @ApiProperty({
        default:'1000',
        description: '已生產數量',
      })
      producedQuantity: string;

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
        example:'2023-02-01',
        description: '實際完工日',
      })
      realCompletionDate: string;

}