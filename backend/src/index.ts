import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston'

const PORT = process.env.PORT || 3001;
const NO_COLOR = process.env.NO_COLOR;

const app = express();

const winstonTransports = [new winston.transports.Console()];
const winstonFormat = NO_COLOR
  ? winston.format.json()
  : winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )

const logger = winston.createLogger({
  transports: winstonTransports,
  format: winstonFormat,
})

app.use(expressWinston.logger({
  transports: winstonTransports,
  format: winstonFormat,
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}))

if (process.env.STATIC_FOLDER) {
  app.use(express.static(process.env.STATIC_FOLDER));
}

const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'hello world' });
});

app.use(process.env.API_PREFIX || '/', router);

const server = app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`)
});

process.on('SIGINT', () => {
  logger.warn('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
  });
});

process.on('SIGTERM', () => {
  logger.warn('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
  });
});