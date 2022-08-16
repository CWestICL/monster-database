const {DataTypes, db} = require('../db');

const Monster = db.define("monster", {
    name: DataTypes.STRING,
    year: DataTypes.INTEGER
});

module.exports = {Monster};