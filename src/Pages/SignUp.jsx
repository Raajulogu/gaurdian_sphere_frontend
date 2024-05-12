import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "../animation.css";
import { handlesignUp } from "../container/services";

//Validation Schema
let fieldValidationSchema = yup.object({
  name: yup.string().required("Please Enter your Name"),
  email: yup.string().required("Please Enter your Email"),
  password: yup.string().required("Create New Password"),
  gender: yup.string().required("Please Mention your Gender"),
  city: yup.string().required("Please Mention your City"),
  mobile: yup.string().required("Please Mention your Mobile"),
});
const SignUp = () => {
  let [loading, setLoading] = useState(null);
  let navigate = useNavigate();
  let { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      gender: "",
      city: "",
      mobile: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: (user) => {
      handleSignUp(user);
    },
  });

  async function handleSignUp(user) {
    setLoading(1);
    let response = await handlesignUp(user);
    if (response) {
      navigate("/");
    } else {
      alert("Singup error, please try later");
    }
  }

  return (
    <div
      className="flex items-center justify-center h-[100vh] w-[100vw] bg-transparent bg-cover"
      style={{ backgroundImage: `url(https://shorturl.at/mpU59)` }}
    >
      <div className="flex flex-col items-center min-w-[35%] min-h-[40%] bg-[#FDBA44] bg-cover py-[10px] rounded-[5px] shadow-[5px_5px_5px_5px_black] signup-box">
        <h1>Sign Up</h1>
        <br />
        <form
          onSubmit={handleSubmit}
          className="mx-[20px] flex flex-col w-[80%]"
        >
          <TextField
            name="name"
            type="name"
            label="Name"
            placeholder="Enter your name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name ? (
            <div style={{ color: "crimson" }}>{errors.name}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email ? (
            <div style={{ color: "crimson" }}>{errors.email}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            name="city"
            type="city"
            label="City"
            placeholder="Enter your city"
            value={values.city}
            onChange={handleChange}
          />
          {errors.name ? (
            <div style={{ color: "crimson" }}>{errors.name}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            name="mobile"
            type="name"
            label="Number"
            placeholder="Enter your Mobile Number"
            value={values.mobile}
            onChange={handleChange}
          />
          {errors.email ? (
            <div style={{ color: "crimson" }}>{errors.email}</div>
          ) : (
            ""
          )}
          <br />
          <div className="flex flex-col items-start">
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="gender"
              value={values.gender}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>
          <br />
          <TextField
            name="password"
            type="password"
            label="Password"
            placeholder="Creat New Password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password ? (
            <div style={{ color: "crimson" }}>{errors.password}</div>
          ) : (
            ""
          )}
          <br />
          <div className="flex justify-center">
            {loading ? (
              <Button variant="contained" type="submit">
                Signing Up...
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Sign Up
              </Button>
            )}
          </div>
        </form>
        <br />
        <div>
          <p className="log-btn">
            Already have an account ?{" "}
            <a href="/login" className="text-blue-900">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
