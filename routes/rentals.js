const Rental = require('../models/rental');
const Movie = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  Rental.find()
    .select('customer movie rentalFee dateOut dateReturned')
    .populate('customer', "isGold phone name _id")
    .populate('movie', "_id title genre numberInStock dailyRentalRate")
    .sort('dateOut')
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  Customer.findById(req.body.customerId)
    .then(customer => {
      if (!customer) {
        return res.status(404).json({
          message: 'Given Customer ID is Invalid'
        })
      } else {
        Movie.findById(req.body.movieId)
          .then(movie => {
            if (!movie) {
              return res.status(404).json({
                message: 'Given Movie ID is Invalid'
              })
            } else {
              const rental = new Rental({
                customer: req.body.customerId,
                movie: req.body.movieId,
                dateOut: req.body.dateOut,
                dateReturned: req.body.dateReturned,
                rentalFee: req.body.rentalFee
              });

              return rental.save();
            }
          })
          .then(result => {
            res.status(201).json({
              message: 'Rental Has Been Ordered',
              request: {
                type: 'GET',
                url: `http://localhost:3000/rentals/${result._id}`
              }
            })
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

router.delete('/:id', (req, res, next) => {
  Rental.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(200).json({
      message: 'Rental has been deleted with the given ID'
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
})

router.get('/:id', (req, res, next) => {
  Rental.findById(req.params.id)
    .select('customer movie rentalFee dateOut dateReturned')
    .populate('customer', "isGold phone name _id")
    .populate('movie', "_id title genre numberInStock dailyRentalRate")
    .sort('dateOut')
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

module.exports = router;
