import winston from 'winston';
import { winstonFormat, winstonTransports } from './common';

const logger = winston.createLogger({
  transports: winstonTransports,
  format: winstonFormat,
});

export default logger;
