import { CreateStockedRecord } from './dto/create-stocked-record.dto';
import { StockedDto } from './dto/stocked.dto';
export declare class AppService {
    createStockedRecord(data: CreateStockedRecord): CreateStockedRecord;
    StockedDto(data: StockedDto): StockedDto;
    getStocksList(): void;
    getStocks(): void;
}
