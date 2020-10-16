import express from 'express';
import logger from "./logger";
import expressLogger from "./logger/expressLogger";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(expressLogger);

if (process.env.STATIC_FOLDER) {
  app.use(express.static(process.env.STATIC_FOLDER));
}

const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'hello world' });
});

app.use(process.env.API_PREFIX || '/', router);

const server = app.listen(PORT, () => {
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