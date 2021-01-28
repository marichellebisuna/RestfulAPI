const express = require('express');
const morgan = require('morgan');
const ProductRoute = require('./Routes/Product.route');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', ProductRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`PORT running at port ${PORT}.`));
