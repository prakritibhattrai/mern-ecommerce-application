class AppError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = 'Bad Request') {
        return new AppError(message, 400);
    }

    static unauthorized(message = 'Unauthorized') {
        return new AppError(message, 401);
    }

    static forbidden(message = 'Forbidden') {
        return new AppError(message, 403);
    }

    static notFound(message = 'Not Found') {
        return new AppError(message, 404);
    }

    static internalServerError(message = 'Internal Server Error') {
        return new AppError(message, 500);
    }

}

module.exports = AppError