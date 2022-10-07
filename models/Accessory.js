const { Schema, model, Types: {ObjectId} } = require('mongoose');

const accSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    imgURL: { type: String, require: true },
    cubes: { type: [ObjectId] , default: [], ref: 'Cube' }
});

const Accessory = model('Accessory', accSchema);

module.exports = Accessory;