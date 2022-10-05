import axios from "axios";
import React from "react";
import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export const ProfileModal = ({ showProfile, setShowProfile }) => {

  const [profileFile, setProfileFile] = useState(null);

  const handleClose = () => {
    setShowProfile(false);
    setProfileFile(null);
  }

  const handleChange = (e) => setProfileFile(e.target.files[0]);

  const handlePost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", "ProfileImage");
    formData.append("file", profileFile);
    
    axios.post("/post", formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })

    handleClose();
  }


  return (
    <Modal show={showProfile} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Select a new Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Form>
            <Form.Group className="mb-3">
                <img className="image-input" src={profileFile && URL.createObjectURL(profileFile)} alt="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <input type="file" accept="image/*" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handlePost}>Change</Button>
        </Modal.Footer>
    </Modal>
  )
}
