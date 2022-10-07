const { Schema, model, Types } = require('mongoose');

const cubeSchema = new Schema({
    name : {type: String, require: true},
    description:{type: String, require: true},
    level : {type: Number, require: true},
    imgURL : {type: String, require: true},
    accessory: {type: [Types.ObjectId], default: [], ref: 'Accessory'}
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;