require("express-async-errors");

const AppError = require('./utils/AppError');
const express = require('express');
const ROUTES = require('./routes');

const APP = express();

APP.use(express.json());

APP.use(ROUTES);

APP.use((error, request, response, next) => {
    if ( error instanceof AppError) {

        return response.status(error.statusCode).json({
            status:"error",
            message: error.message
        });
    }

    return response.status(500).json({
        status:"error",
        message:"Internal server error"
    });
});

const PORT = 3000;

APP.listen(PORT, () => console.log(`Server is running on port ${PORT}`));