import React, { useState, useEffect } from "react";
import { PostModal } from "../components/PostModal";
import { ProfileModal } from "../components/ProfileModal";
import { NavbarB } from "../components/Navbar";
import { Images } from "../components/Images";
import { Profile } from "../components/Profile";
import axios from "axios";
import { encode } from "base64-arraybuffer";


export const MyProfile = () => {

  const [showPost, setShowPost] = useState(false);
  const [showProfile, setShowProfile] = useState(false);


  const [image, setImage] = useState([]);
  const [profile, setProfile] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    axios.post("/get-images", { username: null })
        .then((res) => {
          
          console.log(res);
          setName(res.data.currUser);
          const profilebuffer = res.data.profileImg.data;
          const profilebase64String = encode(profilebuffer);
          const profileurl = "data:image/png;base64," + profilebase64String;
          
          setProfile(profileurl);

          const IMAGES = [];
          if (res.data.imgs) {
            res.data.imgs.forEach((img) => {
              const imagebuffer = img.data;
              const imagebase64String = encode(imagebuffer);
              const imageurl = "data:image/png;base64," + imagebase64String;
              
              const imge = imageurl;
              // console.log(url);
              IMAGES.push(imge);
            })
          }
          setImage(IMAGES);

        })
        .catch(err => {
            console.log(err);
        })
}, [])

  return (
    <>
      <NavbarB />
      <PostModal showPost={showPost} setShowPost={setShowPost} />
      <ProfileModal showProfile={showProfile} setShowProfile={setShowProfile} />
      <Profile profile={profile} name={name} setShowPost={setShowPost} setShowProfile={setShowProfile} />
      <Images image={image} />
    </>
  )
}
