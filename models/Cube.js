const { Schema, model } = require('mongoose');

const cubeSchema = new Schema({
    name : {type: String, require: true},
    description:{type: String, require: true},
    level : {type: Number, require: true},
    imgURL : {type: String, require: true},
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;