const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Mongodb connected.');
  })
  .catch((err) => console.log(err.message));

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected.');
});
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected.');
});
mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
