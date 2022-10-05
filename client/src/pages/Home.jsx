import React from "react";
import { NavbarB } from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { encode } from "base64-arraybuffer";

export const Home = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {

    axios.get("/get-all-images")
      .then((res) => {
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
          setImages(IMAGES);
      })
      .catch(err => {
          console.log(err);
      })

  }, [])


  return (
    <>
      <NavbarB />
      <div className="all-images">
        {images ? 
            images.map((img, idx) => {
                return <div key={idx} className="all-images-image"><img src={img} alt="No Photos" /></div>
            }) : 
            <h2>No posts yet.</h2> 
        }
      </div>
    </>
  )
}
