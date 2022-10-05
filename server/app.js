const express = require("express");
const routes = require("./routes/index.js");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sessionStore = MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/PersonDB",
    collectionName: "sessions"
});

app.use(session({
    secret: "This is a secret.",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }

}));

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());


app.use(routes);
 
app.listen(3001, (req, res) => {
    console.log("Server listening on port 3001");
});