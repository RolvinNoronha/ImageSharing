import React from "react";

export const Images = ({ image }) => {
    return (
        <div className="profile-pictures">
            <div className="pictures">
                {image ? 
                    image.map((img, idx) => {
                        return <img key={idx} src={img} alt="No Photos" />
                    }) : 
                    <h2>No posts yet.</h2> 
                }
            </div>
        </div>
    )
}
