
require('dotenv').config();

const { env } = process;
const express = require('express');
const errorHandlerMiddleware = require('./src/middleware/error-handler');
const router = require('./src/routes');

const app = express();

app.use(express.json());

app.use('/',router);

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

app.use(errorHandlerMiddleware);

app.listen(env.PORT, () => {
  console.log(`Listening on port ${env.PORT}`);
});