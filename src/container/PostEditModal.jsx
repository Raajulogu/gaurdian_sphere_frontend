/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { editPost } from "./services";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostEditModal = ({ openModal, setOpenModal, data }) => {
  let token = localStorage.getItem("token");
  const handleClose = () => setOpenModal(false);
  let [loading, setLoading] = useState(false);
  let [title, setTitle] = useState(data.title);
  let [details, setDetails] = useState(data.details);

  async function updatePost(event) {
    event.preventDefault();
    setLoading(true);
    let val = { title, details };
    let res = await editPost(data._id,val, token);
    if (!res.message == "Post updated Successfully") {
      alert("Error Editing Post Please try again later");
    }
    setLoading(false);
    handleClose()
  }
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="font-bold text-[20px]">Edit Post:</h1>
        <br/>
        <form
          onSubmit={updatePost}
          className="w-[70vw] flex flex-col justify-center"
        >
          <TextField
            name="title"
            type="title"
            label="Title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            multiline
            rows={5}
            name="details"
            type="details"
            label="Details"
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <br />
          <br />
          <div className="submit-btn">
            {loading ? (
              <Button variant="contained" type="submit">
                Updating...
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Update
              </Button>
            )}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default PostEditModal;
