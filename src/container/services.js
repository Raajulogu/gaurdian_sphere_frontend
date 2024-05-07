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

export {handlelogin,handlesignUp}