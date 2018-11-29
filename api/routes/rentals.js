const express = require('express');
const router = express.Router();
const RentalController = require('../controllers/rentals');

router.get('/', RentalController.rentals_get_all);

router.post('/', RentalController.rentals_post);

router.delete('/:id', RentalController.rentals_delete);

router.get('/:id', RentalController.rentals_get_by_id);

module.exports = router;
