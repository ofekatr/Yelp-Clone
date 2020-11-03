export { };

module.exports = (err, _, __, next) => {
    console.log("HELLO, WORLD!");
    next(err);
};