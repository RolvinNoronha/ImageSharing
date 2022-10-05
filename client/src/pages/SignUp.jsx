import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NavbarL } from "../components/NavbarL";

export const SignUp = () => {


  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      username: username,
      password: password
    }

    axios.post("/signup", user)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })

    navigate("/");
  }




  return (
    <>
      <NavbarL />
      <Form className="d-flex justify-content-center align-items-center flex-d">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            className="mb-3"
            onChange={(e) => setUsername(e.target.value)} 
            type="username" 
            placeholder="Enter username" 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder="Enter password" 
          />
        </Form.Group>
        <Form.Text className="text-muted">
          Already have an account, Login In <Link to="/">here</Link>
        </Form.Text>
        <Button onClick={handleSubmit} variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </>
  )
}
