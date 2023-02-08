import {  ApiProperty } from '@nestjs/swagger';

export class CreateStockedRecord {
  
    @ApiProperty({
        example: 200.05,
        description: '入庫重量',
      })
      weight: number;
    
      @ApiProperty({
        example: 400.01,
        description: '入庫數量，由重量去換算而得',
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
}