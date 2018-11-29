const express = require('express');
const router = express.Router();

const MoviesController = require('../controllers/movies');

router.get('/', MoviesController.movies_get_all);

router.post('/', MoviesController.movies_post);

router.delete('/:id', MoviesController.movies_delete);

router.get('/:id', MoviesController.movies_get_by_id);

module.exports = router;