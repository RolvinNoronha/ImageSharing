import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home} from "./pages/Home";
import { Search } from "./pages/Search";
import { MyProfile } from "./pages/MyProfile";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { UserSearch } from "./pages/UserSearch";
import { useState } from "react";
import { Logout } from "./pages/Logout";
import { SignUp } from "./pages/SignUp";
import { Alert } from "react-bootstrap";

export const App = () => {

  const [alert, setAlert] = useState(false);

  return (
    <>
      {alert ? <Alert variant="danger" onClose={() => setAlert(false)} dismissible>Wrong Password!</Alert> : null}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Login setAlert={setAlert} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="user/:slug" element={<UserSearch />} />
      </Routes>
    </>
  )
}
