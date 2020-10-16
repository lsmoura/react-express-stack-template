import express from 'express';

const app: express.Router = express.Router();

app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

export default app;
