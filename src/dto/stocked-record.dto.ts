import {  ApiProperty } from '@nestjs/swagger';

export class StockedRecordDto {
  
    @ApiProperty({
        example: 200.05,
        description: '入庫紀錄 index',
      })
      id: number;

    @ApiProperty({
        example: 200.05,
        description: '入庫重量',
      })
      weight: number;
    
      @ApiProperty({
        example: 400,
        description: '入庫數量',
      })
      quantity: number;
    
      @ApiProperty({
        example: "ZB1105-120622",
        description: '生產批號',
      })
      lotnumber: string;

      @ApiProperty({
        example: "ZB1105-120622",
        description: '倉儲位編號',
      })
      storagenumber: string;

      @ApiProperty({
        example: "2023-02-01",
        description: '入庫時間',
      })
      createAt: string;
}