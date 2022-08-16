const {db} = require('.')
const {monsterData,filmData} = require('./seedData');
const {Monster,Film} = require('../models')
const relationships = [
    [1,1,9],
    [2,2,3,9,12,14,15],
    [3,3],
    [4,4,14,15],
    [5,5],
    [6,6],
    [7,7],
    [8,8,12,14],
    [9,9,16],
    [10,10],
    [11,11],
    [12,13],
    [13,14,15],
    [14,16],
    [15,16]
]

let populateDataBase = async () => {
    await db.sync({ force: true });
    await Promise.all(monsterData.map((c) => {Monster.create(c)}));
    await Promise.all(filmData.map((c) => {Film.create(c)}));

    for (let rel of relationships) {
        let monster = await Monster.findOne({where: {id: rel[0]}});
        for (let i=1;i<rel.length;i++) {
            let film = await Film.findOne({where: {id: rel[i]}});
            await monster.addFilm(film);
        }
    }
    /*
    let kong = await Monster.findOne({where: {name: "King Kong"}});
    console.log(kong);
    let film = await Film.findOne({where: {title: "King Kong"}});
    console.log(film);
    await kong.addFilm(film);
    //await kong.addFilm(Film.findOne({where: {title: "King Kong vs. Godzilla"}}));
    */
};

let buildDB = async () => {
    await populateDataBase();
}

module.exports = {buildDB}