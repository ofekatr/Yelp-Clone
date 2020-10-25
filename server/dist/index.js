"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express = require('express');
var app = express();
var DEF_PORT = require('./config').DEF_PORT;
var port = process.env.PORT || DEF_PORT;
var commonPath = '/api/v1/restaurants';
// Get Restaurans 
app.get(commonPath, function (_, res) {
    // res.send("These are the restaurants.");
    res.status(200).json({
        data: {
            restaurants: ["McDonald"]
        }
    });
});
// Get A Restaurant
app.get(commonPath + "/:id", function (req, res) {
    res.status(200).json({
        data: {
            id: req.params.id,
            restaurant: "McDonald"
        }
    });
});
app.listen(port, function () {
    console.log("Server is listening on port " + port);
});
