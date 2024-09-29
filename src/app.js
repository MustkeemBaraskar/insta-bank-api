const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./api/auth');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use('/auth', authRoute);


app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
