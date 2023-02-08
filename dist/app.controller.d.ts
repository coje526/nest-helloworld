import { AppService } from './app.service';
import { CreateStockedRecord } from './dto/create-stocked-record.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getStocksList(): void;
    getStocks(): void;
    createStockedRecord(data: CreateStockedRecord): CreateStockedRecord;
}
