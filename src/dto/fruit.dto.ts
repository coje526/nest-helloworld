import {  ApiProperty } from '@nestjs/swagger';

export class FruitDto {
  
      @ApiProperty({
        description: 'fruit_name',
      })
      name: string;
    
      @ApiProperty({
        description: 'fruit_price',
      })
      price: number;
  
}