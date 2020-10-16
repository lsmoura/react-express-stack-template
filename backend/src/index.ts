import express from 'express';
import logger from './logger';
import expressLogger from './logger/expressLogger';
import app from './app';

const PORT = process.env.PORT || 3001;

const expressServer = express();

expressServer.use(expressLogger);

if (process.env.STATIC_FOLDER) {
  expressServer.use(express.static(process.env.STATIC_FOLDER));
}

expressServer.use(process.env.API_PREFIX || '/', app);

const server = expressServer.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
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
