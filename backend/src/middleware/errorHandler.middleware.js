const AppError = require('./appError.middleware');

const errorHandler = (error, req, res, next) => {
    console.log(error)

    // Handle specific errors
    if (error.statusCode === 404) {
        return res.status(404).json({
            error: 'Not Found',
            message: error.message,
        });
    }
    // Handle specific errors
    if (error.statusCode === 403) {
        return res.status(403).json({
            error: 'Resource Already Exists',
            message: error.message,
        });
    }
    // Handle specific errors
    if (error.statusCode === 401) {
        return res.status(401).json({
            error: 'User Unauthorized',
            message: error.message,
        });
    }

    if (error.statusCode === 400) {
        return res.status(400).json({
            error: 'Bad Request',
            message: error.message,
        });
    }

    // For other errors, return a generic 500 response
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong',
    });
}

module.exports = errorHandler