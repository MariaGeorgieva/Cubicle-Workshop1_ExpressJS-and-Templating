const fs = require('fs');


const filename = './models/database.json';
const data = JSON.parse(fs.readFileSync(filename));

//rewrite to database.json
async function persist() {
    return new Promise((res, rej) => {
        fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
            if (err == null) {
                res();
            } else {
                rej(err);
            }
        });
    });
}


function getAll(search, fromDiff, toDiff) {
    return data
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        .filter(c => c.level >= fromDiff && c.level <= toDiff);
}

function getById(id) {
    return data.find(i => i.id == id);
}

async function createCube(cubeData) {
    const cube = {
        id: getId(),
        name: cubeData.name,
        description: cubeData.description,
        imgURL: cubeData.imgURL,
        level: cubeData.level,
    }

    data.push(cube);
    await persist();

    return cube;
}

//create random id 
function getId() {
    return ('000000' + (Math.random() * 999999 | 0).toString(16)).slice(-6);
}

module.exports = {
    getAll,
    getById,
    createCube
}