import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";

const fontStyles = { color: "black", fontSize: "23px" };

const CommentModel = ({user}) => {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [comments, setComments] = useState([]);
  const [input, setInputs] = useState("");

  const handleSubmit = () => {
    
      setComments((prevComments) => [...prevComments, input]);
      setInputs(" ");
    
  };


  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        className="bg-white border-0"
        id="like"
      >
        <FaRegComment style={fontStyles} className="me-1" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-5">
            <input
              type="text"
              className="form-control "
              value={input}
              placeholder="add your comment..."
              onChange={(e) => setInputs(e.target.value)}
            />
            <button
              className="input-group-text border-0 bg-white text-info fw-bold  "
              onClick={handleSubmit}
            >
              post
            </button>
          </div>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <p key={index} className="mb-2">
                <strong>{user}</strong>   {comment}
              </p>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommentModel;
