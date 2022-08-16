const {buildDB} = require('./db/populateDataBase')

const express = require("express");
const app = express();
const {Monster,Film} = require("./models") 
const path = require("path");
const port = 3000;

app.get("/", (req,res)=> {
    res.sendStatus(200);
});

app.get("/monsters", async (req,res)=> {
    let allMonsters = await Monster.findAll({include: Film});
    let payload = [];
    if (!allMonsters) {
        res.sendStatus(404);
    }
    else if (req.query.n) {
        for (let monst of allMonsters) {
            if (monst.films.length === Number(req.query.n)) {
                payload.push(monst.name);
            }
        }
        if (payload.length > 0) {
            res.send(payload);
        }
        else {
            res.sendStatus(404);
        }
    }
    else {
        for (let monst of allMonsters) {
            payload.push(monst.name);
        }
        res.send(payload);
    }
});

app.get("/monsters/:id", async (req,res)=> {
    let findMonster = await Monster.findByPk(req.params.id,{include: Film});
    if (!findMonster) {
        res.sendStatus(404);
    }
    else {
        let {name,year} = findMonster;
        let filmArr = [];
        for (let film of findMonster.films) {
            filmArr.push(film.title);
        }
        let payload = {
            name: name,
            year: year,
            films: filmArr
        };
        res.send(payload);
    }
    
});

app.get("/films", async (req,res)=> {
    let allFilms = await Film.findAll({include: Monster});
    let payload = [];
    if (!allFilms) {
        res.sendStatus(404);
    }
    else if (req.query.n) {
        for (let film of allFilms) {
            if (film.monsters.length === Number(req.query.n)) {
                payload.push(film.title);
            }
        }
        if (payload.length > 0) {
            res.send(payload);
        }
        else {
            res.sendStatus(404);
        }
    }
    else {
        for (let film of allFilms) {
            payload.push(film.title);
        }
        res.send(payload);
    }
});

app.get("/films/:id", async (req,res)=> {
    let findFilm = await Film.findByPk(req.params.id,{include: Monster});
    if (!findFilm) {
        res.sendStatus(404);
    }
    else {
        let {title,director,year} = findFilm;
        let monstArr = [];
        for (let monst of findFilm.monsters) {
            monstArr.push(monst.name);
        }
        let payload = {
            title: title,
            director: director,
            year: year,
            monsters: monstArr
        };
        res.send(payload);
    }
});

async function main() {
    await buildDB();
    app.listen(port, () => {
        console.log("The server is live and listening at http://localhost:3000");
    });
}

main();
