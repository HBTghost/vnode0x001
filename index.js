require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'));

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}
app.use(express.json());

// Subscriber
const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

// Lottery
const lotteriesRouter = require('./routes/lotteries');
app.use('/lotteries', lotteriesRouter);

const port = process.env.PORT || 7070;

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));