import React, { useState } from "react";
import Base from "../Base/Base";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import { config } from "../config";
import { useNavigate } from "react-router-dom";
import { uploadPost } from "../container/services";

//Configs
let preset_key = config.preset_key;
let cloud_name = config.cloud_name;

//Validation Schema
let fieldValidationSchema = yup.object({
  title: yup.string().required("Please Provide a Title for the Post"),
  details: yup.string().required("Please Provide a Details of the Post"),
});

const NewPost = () => {
  let [image, setImage] = useState("");
  let [filename, setFilename] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let formData = new FormData();
  let token = localStorage.getItem("token");
  //Formik Actions
  let { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      title: "",
      details: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: (post) => {
      Post(post);
    },
  });

  //Image uploading to Cloudinary
  async function handleUpload(event) {
    let file = event.target.files[0];
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    if (file && file.name) {
      setFilename(file.name);
    }
    try {
      let res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
        formData
      );

      setImage(res.data.secure_url);
    } catch (error) {
      console.error("Cloudinary Error:", error.response);
    }
  }
  //Uploading Post
  async function Post(post) {
    setLoading(true);
    if (!image) {
      alert("Please upload a image");
      setLoading(false);
      return false;
    }
    post["image"] = image;
    await uploadPost(post, token);
    setLoading(false);
    navigate("/your-post");
  }
  return (
    <Base Page={"New Post"}>
      <div className="w-[100%] flex justify-center pt-[5vh]">
        <form
          onSubmit={handleSubmit}
          className="w-[70vw] flex flex-col justify-center"
        >
          <div className="text-center p-[3%] border border-solid border-black border-[1px]">
            <label htmlFor="inputTag" className="cursor-pointer">
              Select Picture
              <br />
              <input
                type="file"
                id="inputTag"
                className="contents"
                onChange={handleUpload}
              />
              <AddAPhotoIcon />
              {filename}
            </label>
          </div>
          <br />
          <TextField
            name="title"
            type="title"
            label="Title"
            placeholder="Enter Title"
            value={values.title}
            onChange={handleChange}
          />
          {errors.title ? (
            <div style={{ color: "crimson" }}>{errors.title}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            multiline
            rows={4}
            name="details"
            type="details"
            label="Details"
            placeholder="Enter the body content"
            value={values.details}
            onChange={handleChange}
          />
          {errors.details ? (
            <div style={{ color: "crimson" }}>{errors.details}</div>
          ) : (
            ""
          )}
          <br />
          <div className="submit-btn">
            {loading ? (
              <Button variant="contained" type="submit">
                Uploading...
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Upload
              </Button>
            )}
          </div>
        </form>
      </div>
    </Base>
  );
};

export default NewPost;
