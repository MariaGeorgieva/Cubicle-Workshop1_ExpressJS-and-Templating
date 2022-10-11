const { Schema, model, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({

    username: { type: String, minlength: [3, 'Username must be at least 3 characters long'], require: true },
    hashedPassword: { type: String, require: true },
    roles: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user'] }
});


userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;

