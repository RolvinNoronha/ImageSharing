import React from "react";
import { Navbar, Container } from "react-bootstrap";

export const NavbarL = () => {

  return (
    <Navbar style={{backgroundColor: "lightblue"}} className="shadow-lg bg-lightyellow" sticky="top" variant="light">
        <Container className="mb-3 mt-3">
            <Navbar.Brand>Login</Navbar.Brand>
        </Container>
    </Navbar>
  );
}
