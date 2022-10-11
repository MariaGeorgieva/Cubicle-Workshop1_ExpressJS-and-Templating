const bcrypt = require('bcrypt');
const User = require('../models/User');


async function register(username, password) {

    // checking if username is taken
    const existing = await User.findOne({ username });
    if (existing) {
        throw new Error('Username is taken');
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user and save it to database
    const user = await User.create({
        username,
        hashedPassword
    });

    // return user data
    return {
        username,
        roles: user.roles
    };

}


async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Incorrect username or password');
    }

    return {
        _id: user._id,
        username: user.username,
        roles: user.roles
    };
}

function attachToken(req, res, data) {
    const token = req.signJwt(data);
    res.cookie('jwt', token, { maxAge: 14400000 });
}


module.exports = {
    login,
    register,
    attachToken
}