const { Customer, validate } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.status(200).send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer.save()
    .then(result => {
      res.status(200).json({
        message: 'New Customer Added to Database',
        customer: result
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    });
});

router.patch('/:id', async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Customer.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Customer Updated',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  Customer.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Customer deleted with the given ID ' + id,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})


router.get('/:id', async (req, res) => {
  Customer.findById(req.params.id)
    .select('name phone isGold')
    .exec()
    .then(result => {
      res.status(200).json({
        customer: result
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;