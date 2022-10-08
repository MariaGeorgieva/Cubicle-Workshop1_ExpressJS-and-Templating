const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAllAccessories() {
    return Accessory.find({}).lean();
}

async function createAccessory(accData) {

    const accessory = {
        name: accData.name,
        description: accData.description,
        imgURL: accData.imgURL
    }

    //validation form and error handling 
    const missingFields = Object.entries(accessory).filter(([k, v]) => !v);
    if (missingFields.length > 0) {
        throw new Error(missingFields.map(m => `${m[0]} is required!`).join('\n'));
    }
    const result = await Accessory.create(accessory);

    return result;
}

async function addAccessoriesToCube(cubeId, accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessory.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();
}

module.exports = {
    getAllAccessories,
    createAccessory,
    addAccessoriesToCube
}