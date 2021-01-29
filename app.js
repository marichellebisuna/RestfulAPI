const express = require('express');
const morgan = require('morgan');
const ProductRoute = require('./Routes/Product.route');
require('./helpers/init_mongodb');
const createError = require('http-errors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', ProductRoute);

//error middleware
app.use((req, res, next) => {
  // const err = new Error('Page Not Found.');
  // err.status = 404;
  // next(err);
  next(createError(404, 'Page Not found.'));
});
//error handler
app.use((err, re, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`PORT running at port ${PORT}.`));
