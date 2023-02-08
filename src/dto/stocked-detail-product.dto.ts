import {  ApiProperty } from '@nestjs/swagger';

export class DetailProduct {
  
    @ApiProperty({
        example: 'WIRE38',
        description: '商品品號',
      })
      id: string;
    
      @ApiProperty({
        example: 0.5,
        description: '單位淨重',
      })
      weight: number;
    }