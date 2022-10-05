import React from "react";

export const ProfileStats = ({ Images }) => {
    return (
        <div className="profile-stats-2">
            <div className="profile-posts">
              <h2>Posts</h2>
              <h3>{Images}</h3>
            </div>
        </div>
    )
}
