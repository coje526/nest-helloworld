import { Injectable } from '@nestjs/common';
import { CreateStockedRecord } from './dto/create-stocked-record.dto';
import { login } from './dto/create-user.dto';
import { StockedDto } from './dto/stocked.dto';

@Injectable()
export class AppService {
  createStockedRecord(data: CreateStockedRecord) {
    return data;
  }
 
  StockedDto(data: StockedDto) {
    return data;
  }

  getStocksList() {
      return;
  }

  getStocks() {
    return ;
  }
 
 


}

