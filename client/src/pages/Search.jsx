import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavbarB } from "../components/Navbar";

export const Search = () => {

  const [name, setName] = useState("");
  const [user, setUser] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    let user = { 
      username: name
    }

    axios.post("/search", user)
      .then((res) => {
        setUser(res.data.name);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
        <>
          <NavbarB />
          <Form className="search-area">
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button onClick={handleClick} variant="outline-secondary" type="submit">Search</Button>
          </Form>
          {user && <div className="search-user-result"><Link to={"/user/" + user}>{user}</Link></div>}
        </>
  )
}
