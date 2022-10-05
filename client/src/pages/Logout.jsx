import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Logout = () => {

    const navigate = useNavigate();


    
    useEffect(() => {
        axios.get("/logout")
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
        
        navigate("/");
    }, [])

    return (
        <div>Logout</div>
    );
}
