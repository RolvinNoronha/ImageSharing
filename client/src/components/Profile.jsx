import React from "react";
import { Button } from "react-bootstrap";
import { NamePhoto } from "./NamePhoto";
import { ProfileStats } from "./ProfileStats";

export const Profile = ({ setShowPost, setShowProfile, profile, name}) => {

    const handleShowPost = () => setShowPost(true);
    const handleShowProfile = () => setShowProfile(true);

    return (
        <div className="profile-status"> 
            <NamePhoto profile={profile} name={name} />
            <div className="profile-stats">
            <ProfileStats />
                <div className="profile-buttons">
                    <Button variant="primary" onClick={handleShowPost}>Post</Button>
                    <Button variant="primary" onClick={handleShowProfile}>Change Profile</Button>
                </div>
            </div>
        </div>
    )
}
