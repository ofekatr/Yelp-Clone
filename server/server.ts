require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

const { getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } = require('./api/controllers/restaurants');
const { VERSION } = process.env;

const port = process.env.PORT || 4006;
const commonPath = `/api/v${VERSION}/restaurants`;

app.use(morgan('tiny'));
app.use(express.json());

// Get Restaurans 
app.get(commonPath, getRestaurants);

// Get A Restaurant
app.get(`${commonPath}/:id`, getRestaurant);

// Create A Restaurant
app.post(commonPath, createRestaurant);

// Update A Restaurant
app.put(`${commonPath}/:id`, updateRestaurant);

// Delete A Restaurant
app.delete(`${commonPath}/:id`, deleteRestaurant);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

export { };