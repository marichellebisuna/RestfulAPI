const express = require('express');
const router = express.Router();
const Product = require('../Models/Product.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

//to get all products
router.get('/', async (req, res, next) => {
  try {
    // to list all the product with just name and price only
    const result = await Product.find({}, { __v: 0 });

    // to list all products of specific price only
    // const result = await Product.find({ price: 499 }, {});

    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

//to create a new product
router.post('/', async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
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

//get a product by id
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Product.findById(id);
    if (!result) {
      throw createError(404, 'Product not found.');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Product Id'));
      return;
    }
    next(error);
  }
});

//to update a product
router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true }; //to see the update immediately
    const result = await Product.findByIdAndUpdate(id, updates, options);
    if (!result) {
      throw createError(404, 'Product does not exist.');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Product id.'));
    }
    next(error);
  }
});

//to delete a product
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      throw createError(404, 'Product not found.');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Product Id.'));
      return;
    }
    next(error);
  }
});

module.exports = router;
