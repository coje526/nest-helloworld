import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger implements LoggerService {
  constructor(
    context: string,
  ) {
    super(context);
    /***
     * @condition to check if it is in testing mode
     */
    if (context === 'production') {
      this.setLogLevels(['error', 'warn']);
    }else{
      this.setLogLevels(['debug', 'error', 'log', 'verbose', 'warn']);
    }
    console.log(context);
  }
}