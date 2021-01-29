const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/Product.controller');
const Product = require('../Models/Product.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

//to get all products
router.get('/', ProductController.getAllProducts);

//to create a new product
router.post('/', ProductController.createNewProduct);

//get a product by id
router.get('/:id', ProductController.getProductById);

//to update a product
router.patch('/:id', ProductController.updateProduct);

//to delete a product
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
