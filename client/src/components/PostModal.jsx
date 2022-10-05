import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const PostModal = ({ showPost, setShowPost}) => {

    const [postFile, setPostFile] = useState(null);

    const handleClose = () => {
        setShowPost(false);
        setPostFile(null);
    }

    const handleChange = (e) => setPostFile(e.target.files[0]);

    const handlePost = () => {
        const formData = new FormData();
        formData.append("type", "PostImage");
        formData.append("file", postFile);

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
        <Modal show={showPost} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Select a new Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center">
            <Form>
                <Form.Group className="mb-3">
                    <img className="image-input" src={postFile && URL.createObjectURL(postFile)} alt="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <input type="file" accept="image/*" onChange={handleChange} />
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handlePost}>Post</Button>
            </Modal.Footer>
        </Modal>
    )
}
