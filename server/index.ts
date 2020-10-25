require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

const { query } = require('./db');

const port = process.env.PORT || 4006;
const commonPath = '/api/v1/restaurants';

app.use(morgan('tiny'));
app.use(express.json());

// Get Restaurans 
app.get(commonPath, async (_, res) => {
    const { rows } = await query("SELECT * FROM restaurants;");
    // res.send("These are the restaurants.");
    res.status(200).json({
        data: {
            restaurants: rows
        }
    });
});

// Get A Restaurant
app.get(`${commonPath}/:id`, (req, res) => {
    res.status(200).json({
        data: {
            id: req.params.id,
            restaurant: "McDonald"
        }
    });
});

// Create A Restaurant
app.post(commonPath, (req, res) => {
    res.status(201).json({
        ...req.body
    });
});

// Update A Restaurant
app.put(`${commonPath}/:id`, (req, res) => {
    res.status(200).json({
        ...req.body,
        ...req.params
    })
});

// Delete A Restaurant
app.delete(`${commonPath}/:id`, (req, res) => {
    res.status(204).json({
        status: "success"
    })
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

export { };