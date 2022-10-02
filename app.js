
require('dotenv').config();

const { env } = process;
const express = require('express');
const errorHandlerMiddleware = require('./src/middleware/error-handler');

const app = express();

app.use(express.json());

app.use(errorHandlerMiddleware);

// handle route not found
app.use((req, res) => {
  // return the error message
  res.status(404);
  res.send({
    status: 'error',
    message: 'Route not found',
    code: res.statusCode,
    data: null,
  });
});

app.listen(env.PORT, () => {
  console.log(`Listening on port ${env.PORT}`);
});