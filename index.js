const mongoose = require('mongoose');
const express = require('express');
const customerRoutes = require('./api/routes/customers');
const genreRoutes = require('./api/routes/genres');
const movieRoutes = require('./api/routes/movies');
const rentalRoutes = require('./api//routes/rentals');
const userRoutes = require('./api//routes/users');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/customers', customerRoutes);
app.use('/genres', genreRoutes);
app.use('/movies', movieRoutes);
app.use('/rentals', rentalRoutes);
app.use('/users', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`))