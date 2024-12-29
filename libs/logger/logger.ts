import { Injectable } from '@nestjs/common';
import { Params, PinoLogger } from 'nestjs-pino';

@Injectable()
export class CustomLogger extends PinoLogger {
  private reqId: string;

  constructor(
    params: Params,
  ) {
    super(params);
  }


  debug(message) {
    this.logger.debug({ ...message, });
  }

  log(message) {
    this.logger.info({ ...message,  });
  }

  warn(message) {
    this.logger.warn({ ...message, });
  }

  error(message) {
    this.logger.error({ ...message,  });
  }

  fatal(message) {
    this.logger.fatal({ ...message,  });
  }
}
