import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../animation.css'
import { handlelogin } from "../container/services";

//Validation Schema
let fieldValidationSchema = yup.object({
  email: yup.string().required("Please Enter your Email"),
  password: yup.string().required("Please Enter a Valid Password"),
});
const Login = () => {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(null);
  let { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: (user) => {
      handleLogin(user);
    },
  });

  async function handleLogin(user) {
    setLoading(1);
    let response = await handlelogin(user)
    if(response){
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
    setLoading(false);
  }
  return (
    <div className={`flex items-center justify-center h-[100vh] w-[100vw] bg-transparent bg-cover`} style={{backgroundImage:`url(https://shorturl.at/mpU59)`}}>
      <div className="flex flex-col items-center min-w-[35%] min-h-[40%] bg-[#FDBA44] bg-cover py-[10px] rounded-[5px] shadow-[5px_5px_5px_5px_black] login-box">
        <h1>LogIn</h1>
        <br />
        <form onSubmit={handleSubmit} className="flex flex-col w-[80%] mx-[20px]">
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
          <div>
            <p className="log-btn">
              <a
                href="/reset-password"
                style={{ marginLeft: "65%", color: "blue" }}
              >
                Forgot Password ?
              </a>
            </p>
          </div>
          <br />
          <div className="flex justify-center">
            {loading ? (
              <Button variant="contained" type="submit">
                Logging In...
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                LogIn
              </Button>
            )}
          </div>
        </form>
        <br />
        <div>
          <p className="log-btn">
            Don't haven account ?{" "}
            <a href="/signup" className="text-blue-900">
              Register !
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;