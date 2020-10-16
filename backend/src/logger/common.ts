import winston from 'winston';

const NO_COLOR = process.env.NO_COLOR || false;

export const winstonTransports = [new winston.transports.Console()];
export const winstonFormat = NO_COLOR
  ? winston.format.json()
  : winston.format.combine(winston.format.colorize(), winston.format.json());
