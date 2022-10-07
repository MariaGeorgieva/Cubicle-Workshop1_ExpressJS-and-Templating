const Cube = require('../models/Cube')


function getAll(search, fromDiff, toDiff) {
    return Cube.find({}).lean();
}

function getById(id) {
    return Cube.findById(id).lean();

}

async function createCube(cubeData) {
    const cube = {
        name: cubeData.name,
        description: cubeData.description,
        imgURL: cubeData.imgURL,
        level: Number(cubeData.level),
    }

    //validation form and error handling 
    const missingFields = Object.entries(cube).filter(([k, v]) => !v);
    if (missingFields.length > 0) {
        throw new Error(missingFields.map(m => `${m[0]} is required!`).join('\n'));
    }

    const result = await Cube.create(cube);

    return result;
}



module.exports = {
    getAll,
    getById,
    createCube
}