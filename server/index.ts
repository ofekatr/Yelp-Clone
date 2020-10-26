import { Console } from "console";

require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

const { query } = require('./db');
const { RESTAURANTS } = process.env;

const port = process.env.PORT || 4006;
const commonPath = '/api/v1/restaurants';

app.use(morgan('tiny'));
app.use(express.json());

// Get Restaurans 
app.get(commonPath, async (_, res) => {
    try {
        const { rows } = await query(`SELECT * FROM ${RESTAURANTS};`);
        // res.send("These are the restaurants.");
        res.status(200).json({
            status: "success",
            count: rows.length,
            data: {
                restaurants: rows
            }
        });
    } catch (err) {
        console.error(err);
    }
});

// Get A Restaurant
app.get(`${commonPath}/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await query(`SELECT * FROM ${RESTAURANTS} WHERE id=$1 LIMIT 1;`, [id]);
        // res.send("These are the restaurants.");
        res.status(200).json({
            status: "success",
            count: rows.length,
            data: {
                restaurant: rows[0]
            }
        });
    } catch (err) {
        console.error(err);
    }
});

// Create A Restaurant
app.post(commonPath, async (req, res) => {
    const { name, city, price_range } = req.body;
    try {
        const { rows } = await query(`INSERT INTO ${RESTAURANTS} (name, city, price_range) VALUES ($1, $2, $3) RETURNING *;`, [name, city, price_range]);
        res.status(201).json({
            status: "success",
            restaurant: rows[0]
        });
    } catch (err) {
        console.error(err);
    }
});

// Update A Restaurant
app.put(`${commonPath}/:id`, async (req, res) => {
    const { name, city, price_range } = req.body;
    const { id } = req.params;
    try {
        const { rows } = await query(`UPDATE ${RESTAURANTS} SET name = COALESCE($1, name), city = COALESCE($2, city), price_range = COALESCE($3, price_range) WHERE id = $4 RETURNING *;`, [name, city, price_range, id]);
        res.status(200).json({
            status: "success",
            restaurant: rows[0]
        });
    } catch (err) {
        console.error(err);
    }
});

// Delete A Restaurant
app.delete(`${commonPath}/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        await query(`DELETE FROM ${RESTAURANTS} WHERE id = $1 LIMIT 1`, [id]);
        res.status(204).json({
            status: "success"
        });

    } catch (err) {
        console.error(err);
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

export { };