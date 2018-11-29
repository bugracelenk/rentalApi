const express = require('express');
const router = express.Router();

const CustomerControllers = require('../controllers/customers');

router.get('/', CustomerControllers.customers_get_all);

router.post('/', CustomerControllers.customers_post);

router.patch('/:id', CustomerControllers.customers_update);

router.delete('/:id', CustomerControllers.customers_delete)

router.get('/:id', CustomerControllers.customers_get_by_id);

module.exports = router;