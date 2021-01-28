const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('list of all products.');
});

router.post('/', (req, res, next) => {
  res.send('create a product');
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
