const mongoose = require("mongoose");


const connection = mongoose.createConnection("mongodb://localhost:27017/PersonDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const personSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    
});

const imagesSchema = new mongoose.Schema({
    username: String,
    images: [String]
});

const profileSchema = new mongoose.Schema({
    username: String,
    profile: String
});

const followingSchema = new mongoose.Schema({
    username: String,
    following: [String],
});

const followersSchema = new mongoose.Schema({
    username: String,
    followers: [String],
});

const Images = connection.model("Images", imagesSchema);
const Person = connection.model("Person", personSchema);
const Profile = connection.model("Profile", profileSchema);
const Followers = connection.model("Followers", followersSchema);
const Following = connection.model("Following", followingSchema);

module.exports = connection;