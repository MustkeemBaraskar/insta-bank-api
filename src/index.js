const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./api/auth');
const userRoute = require('./api/users');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.get('/', (req, res)=>{
  res.send("Hello from insta-bank");
})
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use('/auth', authRoute);
app.use('/user', userRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
