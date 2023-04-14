const express = require("express");
const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require('cors')
const { Profile, toDto } = require("./models/Profile");
const { registerUser, generateToken, validateAndReturnPayload, getTokenFromHeader, getBot } = require("./services/auth-service");
const bodyParser = require("body-parser");
const verifyToken = require("./middlewares/auth-middleware");

require("dotenv").config();

const app = express();
app.use(cors())
app.use(bodyParser.json());

/**
 * /POST Route zum einloggen des users
 * @return JWT Token mit userId
 */
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Profile.findOne({ username }).exec();
    if (!user) {
        res.status(401).send("Wrong email or password");
        return;
    }
    const match = await bcrypt.compare(password, user.password)
    
    if(!match) {
        res.status(401).send("Wrong email or password");
        return;
    }

    const access_token = await generateToken(user._id);
    res.send({ access_token });
});

/**
 * /POST Route zum registrieren von user
 * @return JWT Token mit userId
 */
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const newUser = await registerUser(username, password);
    if (!newUser) {
        res.status(400).send("User exists already");
    } else {
        const access_token = await generateToken(newUser._id);
        res.send({ access_token });
    }
});

/**
 * /GET user öffentliches profil 
 * @return User profil 
 */
app.get("/profile", async (req, res) => {
    const { u } = req.query;
    const user = await Profile.findOne({ username: u }).exec();
    
    if(!user) {
        res.status(404).send("Not found");
    }

    res.send(toDto(user._doc));
})

/**
 * /GET momentan eingeloggten user mithilfe JWT Token
 * @return User
 */
app.get("/current-user", verifyToken, async (req, res) => {
    const token = getTokenFromHeader(req.headers["authorization"]);
    const payload = await validateAndReturnPayload(token);
    if(payload == null) {
        res.status(401).send("Unauthorized");
        return;
    }
    
    const { userId } = payload;
    const user = await Profile.findById(userId).exec();
    res.send(toDto(user._doc));
})

/**
 * /PATCH update user daten
 * @return Updated User
 */
app.patch("/update", verifyToken, async (req, res) => {
    const token = getTokenFromHeader(req.headers["authorization"]);
    const payload = await validateAndReturnPayload(token);
    if(payload == null) {
        res.status(401).send("Unauthorized");
        return;
    }
    
    const { userId } = payload;
    
    const updatedUser = await Profile.findByIdAndUpdate(userId, { $set: req.body });
    res.send(toDto(updatedUser._doc));
})

/**
 * /DELETE link durch ID
 */
app.delete("/links/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req.headers["authorization"]);
    const { userId } = await validateAndReturnPayload(token);
    
    const user  = await Profile.findById(userId).exec();
    
    const { links } = user;
    
    const filtered = links.filter(link => link._id != id);

    user.links = [...filtered];
    user.save();
    res.send("ok");
})

/**
 * /POST erstellen eines neuen link
 */
app.post("/links", verifyToken, async (req, res) => {
    const token = getTokenFromHeader(req.headers["authorization"]);
    const { userId } = await validateAndReturnPayload(token);
    
    const user  = await Profile.findById(userId).exec();
    
    const { links } = user;
    
    user.links = [...links, req.body];
    user.save();
    res.send(user.links);
})

/**
 * /PUT Updaten eines links durch ID
 */
app.put("/links/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req.headers["authorization"]);
    const { userId } = await validateAndReturnPayload(token);
    
    const user  = await Profile.findById(userId).exec();
    
    const { links } = user;

    const link = links.splice(links.findIndex(link => link._id.toString() === id),1)[0];

    const { info } = req.body;

    if(link.usernameBased) {
        link.username = info;
    } else {
        link.url = info;
    }

    user.links = [...links, link];
    
    user.save();
    res.send("ok");
});


/**
 * /PATCH Updaten des profilbilds
 */
app.patch("/update-pp", verifyToken, async (req, res) => {
    const token = getTokenFromHeader(req.headers["authorization"]);
    const payload = await validateAndReturnPayload(token);
    const { userId } = payload;
    
    const updatedUser = await Profile.findByIdAndUpdate(userId, { $set: { profilePicture: `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${getBot()}` } }).exec();
    res.send(toDto(updatedUser._doc));
})

/**
 * Starten des servers
 */
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(process.env.PORT || 3000, () => console.log("Server started on port 3000"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
