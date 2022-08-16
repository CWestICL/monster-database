const {Monster} = require('./Monster');
const {Film} = require('./Film');

Monster.belongsToMany(Film, {through: "monster_film"});
Film.belongsToMany(Monster, {through: "monster_film"});

module.exports = {
    Monster,
    Film
};