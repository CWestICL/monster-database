const {DataTypes, db} = require('../db');

const Film = db.define("film", {
    title: DataTypes.STRING,
    director: DataTypes.STRING,
    year: DataTypes.INTEGER
});

module.exports = {Film};