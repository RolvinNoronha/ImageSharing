import React from "react";
import { Button } from "react-bootstrap";
import { NamePhoto } from "./NamePhoto";
import { ProfileStats } from "./ProfileStats";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const Profile = ({ setShowPost, setShowProfile, profile, name}) => {

    const handleShowPost = () => setShowPost(true);
    const handleShowProfile = () => setShowProfile(true);
    const [numImages, setNumImages] = useState(0);

    useEffect(() => {
        axios.post("/stats", {username: null })
            .then(res => {
                setNumImages(res.data.images);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <div className="profile-status"> 
            <NamePhoto profile={profile} name={name} />
            <div className="profile-stats">
            <ProfileStats Images={numImages} />
                <div className="profile-buttons">
                    <Button variant="primary" onClick={handleShowPost}>Post</Button>
                    <Button variant="primary" onClick={handleShowProfile}>Change Profile</Button>
                </div>
            </div>
        </div>
    )
}
