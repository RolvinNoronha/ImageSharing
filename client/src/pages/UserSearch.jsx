import React from "react";
import { NamePhoto } from "../components/NamePhoto";
import { ProfileStats } from "../components/ProfileStats";
import { Button } from "react-bootstrap";
import { Images } from "../components/Images";
import { NavbarB } from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { encode } from "base64-arraybuffer";

export const UserSearch = () => {

    const [image, setImage] = useState([]);
    const [profile, setProfile] = useState();
    const [follow, setFollow] = useState("Follow");

    const slug = useParams();
    
    function handleClick() {
        if (follow === "Follow") {
            setFollow("Unfollow")
            
        }
        else if (follow === "Unfollow") {
            setFollow("Follow");
        }
    }

    useEffect(() => {
        axios.post("/get-images", { username: slug.slug })
            .then((res) => {

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
            <div className="profile-status"> 
                <NamePhoto profile={profile} name={slug.slug} />
                <div className="profile-stats">
                    <ProfileStats />
                    <div className="profile-buttons">
                        <Button variant="primary" onClick={handleClick}>{follow}</Button>
                    </div>
                </div>
            </div>
            <Images image={image} />
        </>
    )
}