import axios from "axios";
import { config } from "../config";

//Login function
async function handlelogin(user) {
    try {
      let response = await axios.post(`${config.backendurl}/auth/login`, user);
      localStorage.setItem("token", response.data.token);
      return true;
    } catch (error){
      return false;
    }
}

//signup function
async function handlesignUp(user) {
    try {
      let response = await axios.post(`${config.backendurl}/auth/signup`, user);
      localStorage.setItem("token", response.data.token);
      return true;
    } catch (error) {
      return false;
    }
}
//fetch user data function
async function fetchData(token) {
  try {
    let response = await axios.get(`${config.backendurl}/auth/get-user-data`, {
      headers: {
        "x-auth": token,
      },
    });
    return response.data;
  } catch {
    alert("Invalid Credentials");
  }
}

export {handlelogin,handlesignUp,fetchData}