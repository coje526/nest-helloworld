import {  ApiProperty } from '@nestjs/swagger';

export class login {
  
    @ApiProperty()
    userAccount: string;
  
    @ApiProperty()
    userPassword: string;
    
  }
