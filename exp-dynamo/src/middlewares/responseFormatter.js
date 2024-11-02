const responseFormatter = (req, res, next) => {
    res.sendFormattedResponse = (statusCode = 200, success = true, message = 'Success', data = null, error = null) => {
        res.status(statusCode).json({
            status: statusCode,
            success: success,
            message: message,
            data: data,
            error: error
        });
    };

    next();
};

module.exports = responseFormatter;