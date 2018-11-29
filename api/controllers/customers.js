const { Customer, validate } = require('../models/customer');
const mongoose = require('mongoose');

exports.customers_get_all = (req, res, next) => {
  Customer.find()
    .select("name phone isGold")
    .sort("name")
    .then(result => {
      res.status(200).json({
        customers: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
};

exports.customers_post = (req, res, next) => {
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
};

exports.customers_update = (req, res, next) => {
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
}

exports.customers_delete = (res, req, next) => {
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
}

exports.customers_get_by_id = (req, res, next) => {
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
}
