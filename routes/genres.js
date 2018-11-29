const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  Genre.find()
    .select('name _id')
    .sort('name')
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  Genre.find({ name: req.body.name })
    .then(genre => {

      const newGenre = new Genre({
        name: req.body.name
      });

      return newGenre.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Genre Added'
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Genre.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Genre Deleted Succesfully'
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:id', (req, res, next) => {
  Genre.findById(req.params.id)
    .exec()
    .then(result => {
      res.status(200).json({
        genre: result
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