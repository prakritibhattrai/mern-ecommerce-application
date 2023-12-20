// Helper function to create and throw an error with a specific status code
const throwError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
};

module.exports = throwError