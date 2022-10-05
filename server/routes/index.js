const router =  require("express").Router();
const connection = require("../config/database.js");
const { genPassword } = require("../lib/passwordUtils.js");
const passport = require("passport");
// const { isAuth } = require("./authMiddleware.js");
const multer = require("multer");
const fs = require("fs");
const { profile } = require("console");


const Images = connection.models.Images;
const Person = connection.models.Person;
const Profile = connection.models.Profile;
const Followers = connection.models.Followers;
const Following = connection.models.Following;
const path = "C:/Users/rolvi/Desktop/Projects/InstagramClone/server/public/";


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public');
     },
    filename: function (req, file, cb) {
        cb(null , Date.now() + "-" + file.originalname);
    }
});
var upload = multer({ storage: storage })



//    POST ROUTES    //
router.post("/signup", (req, res) => {

    const saltHash = genPassword(req.body.password);

    const newPerson = new Person({
        username: req.body.username,
        hash: saltHash.hash,
        salt: saltHash.salt
    });

    newPerson.save()
        .then((user) => {
            res.json({ msg: "Success", user: user });
        })
        .then((err) => {
            res.json(err);
        });

});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ msg: "Success", session: req.session});
});


router.post("/post", upload.single("file"), (req, res) => {
    
    if (req.body.type === "PostImage") {
        Images.findOne({ username: req.user.username })
            .then((user) => {
                if (!user) {
                    const newUser = new Images({
                        username: req.user.username,
                        images: req.file.filename
                    });

                    newUser.save()
                        .then((err) => {
                            console.log(err);
                        })
                }
                else {
                    Images.findOneAndUpdate({ username: user.username}, { $push: { images: req.file.filename }})
                        .then(err => {
                            console.log(err);
                        });
                }
            })
    }
    else if (req.body.type === "ProfileImage") {
        Profile.findOne({ username: req.user.username })
            .then((user) => {
                if (!user) {
                    const newUser = new Profile({
                        username: req.user.username,
                        profile: req.file.filename
                    });

                    newUser.save()
                        .then((err) => {
                            console.log(err);
                        })
                }
                else {
                    Profile.findOneAndUpdate({ username: user.username}, { profile: req.file.filename })
                        .then(err => {
                            console.log(err);
                        });
                }
            })
    }
});


router.post("/search", (req, res) => {
    Person.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                res.json({ name: user.username })
            }
            else {
                res.send(null);
            }
        })
        .catch((err) => {
            console.log(err);
        })
});


router.post("/get-images", (req, res) => {

    
    const name = req.body.username === null ? req.user.username : req.body.username;

    let profileStats = new Object();
    const IMAGES = [];

    profileStats.currUser = req.user.username;
    profileStats.searchUser = req.body.username;



    Profile.find({ username: name })
        .then((user) => {
            profileStats.profileImg = fs.readFileSync(path+user[0].profile);
            
        })
        .catch((err) => {
            console.log(err);
        })

        
    Images.find({ username: name })
        .then((user) => {
            if (user) {
                
                user[0].images.forEach(image => {
                    IMAGES.push(fs.readFileSync(path+image));
                });

                profileStats.imgs = IMAGES;
                res.send(profileStats);
            }
        })
        .catch(err => {
            console.log(err);
        });
    
});

//    GET ROUTES    //
router.get("/test", (req, res) => {
    res.json({ session: req.session, user: req.user});
});


router.get("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
            res.json({ msg: "Successfully Logged out"});
      });
     
});

router.get("/is-auth", (req, res) => {
    if (req.isAuthenticated()) {
        res.send("True");
    }
    else {
        res.send("False");
    }
})

module.exports = router;

