module.exports = properties => (req, res, next) => {
    req.properties = properties;
    return next();
};
