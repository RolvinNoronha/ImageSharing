import React from "react";
import { Navbar, Container, Nav} from "react-bootstrap";

export const NavbarB = () => {

  return (
    <Navbar style={{backgroundColor: "lightblue"}} className="shadow-lg bg-lightyellow" sticky="top" variant="light">
        <Container className="mb-3 mt-3">
            <Navbar.Brand href="/home">Instagram Clone</Navbar.Brand>
            <Nav>
                <Nav.Link href="/search">Search</Nav.Link>
                <Nav.Link href="/my-profile">My Profile</Nav.Link>
                <Nav.Link href="/About">About</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
  );
}
