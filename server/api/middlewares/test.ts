export {};

module.exports = (_, __, next) => {
    console.log("HELLO, WORLD!");
    next();
};