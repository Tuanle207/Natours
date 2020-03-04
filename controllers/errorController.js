const AppError = require('./../ultils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400); // bad request
};
const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message = `Duplicate field value: ${value} Please use another value.`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data ${errors.join('. ')}`;
    return new AppError(message, 400);
};
const handleJWTError = () =>
    new AppError('Invalid token. Please login again.', 401);
const handleJWTExpired = () =>
    new AppError('Your token has expired! Please login again.', 401);

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
const sendErrorProd = (err, res) => {
    // Operational, trusted
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
        // Programming or other unknown error: dont leak error details
    } else {
        console.error('ERROR: ', err);

        res.status(500).json({
            status: 'Error',
            message: 'Something went wrong!'
        });
    }
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};

module.exports = (err, req, res, next) => {
    //console.log(err.stack);

    console.log(err);
    err.statusCode = err.statusCode || 500; //internal servel error
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        console.log(err);
        let error = { ...err };

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpired();
        sendErrorProd(error, res);
    }
};
