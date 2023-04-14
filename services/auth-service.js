const { Profile } = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (username, password) => {
    const userExists = await Profile.findOne({ username }).exec();

    if (userExists) {
        return null;
    }

    const hash = await generateHash(password);

    const newUser = await Profile.create({
        username,
        password: hash,
        profilePicture: `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${getBot()}`,
    });

    return newUser;
};

const generateHash = async (password) => {
    return await bcrypt.hash(password, 10);
};

const getBot = () => {
    const bots = [
        "maggie",
        "max",
        "oreo",
        "oliver",
        "precious",
        "nala",
        "patches",
        "shadow",
        "loki",
        "spooky",
        "gizmo",
        "bella",
        "sheba",
        "bob",
        "garfield",
        "annie",
        "casper",
        "angel",
        "sophie",
    ];

    return bots[Math.floor(Math.random() * bots.length)];
};

const generateToken = async (userId) => {
    return jwt.sign({ userId }, process.env.TOKEN_PK, {
        expiresIn: "24h",
    });
};

const validateAndReturnPayload = async (token) => {
    try {
        return jwt.verify(token, process.env.TOKEN_PK);
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getTokenFromHeader = header => header.split(" ")[1]

module.exports = { registerUser, generateToken, validateAndReturnPayload, getTokenFromHeader, getBot };
