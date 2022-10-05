import React from "react";

export const NamePhoto = ({ profile, name }) => {
    return (
        <div className="profile-name-photo">
            <img src={profile} alt="profile" />
            <p>{name}</p>
        </div>
    )
}
