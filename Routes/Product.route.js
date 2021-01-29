const express = require('express');
const router = express.Router();
const Product = require('../Models/Product.model');

router.get('/', (req, res, next) => {
  res.send('list of all products.');
});

router.post('/', async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }

  // const product = new Product({
  //   name: req.body.name,
  //   price: req.body.price,
  // });
  // product
  //   .save()
  //   .then((result) => {
  //     console.log(result);
  //     res.send(result);
  //   })
  //   .catch((err) => console.log(err.message));
});

router.get('/:id', (req, res, next) => {
  res.send('fetch single product');
});

router.patch('/:id', (req, res, next) => {
  res.send('update a single product');
});

router.delete('/:id', (req, res, next) => {
  res.send('delete a single product');
});

module.exports = router;
