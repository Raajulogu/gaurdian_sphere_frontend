import axios from "axios";
import { config } from "../config";

//Login function
async function handlelogin(user) {
  try {
    let response = await axios.post(`${config.backendurl}/auth/login`, user);
    localStorage.setItem("token", response.data.token);
    return true;
  } catch (error) {
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

//Update User Account
async function updateUser(user, token) {
  try {
    let response = await axios.put(
      `${config.backendurl}/auth/update-user-data`,
      {
        headers: {
          "x-auth": token,
        },
      },
      user
    );
    return response.data;
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

//Delete User Account
async function deleteUser(token) {
  try {
    let response = await axios.delete(`${config.backendurl}/auth/delete-user`, {
      headers: {
        "x-auth": token,
      },
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

//Upload New Post
async function uploadPost(data, token) {
  try {
    let response = await axios.post(
      `${config.backendurl}/post/newpost`,
      {
        headers: {
          "x-auth": token,
        },
      },
      data
    );

    return response.data;
  } catch (error) {
    return false;
  }
}

//Add Views to the Post
async function addViews(id, token) {
  try {
    let response = await axios.put(`${config.backendurl}/post/addviews/${id}`, {
      headers: {
        "x-auth": token,
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
}

//Get All Post
async function getAllPost(id, token) {
  try {
    let response = await axios.get(`${config.backendurl}/post/get-post`, {
      headers: {
        "x-auth": token,
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
}

//Edit Post
async function editPost(data, token) {
  try {
    let response = await axios.put(
      `${config.backendurl}/post/edit-post`,
      {
        headers: {
          "x-auth": token,
        },
      },
      data
    );

    return response.data;
  } catch (error) {
    return false;
  }
}

//Delete Post
async function deletePost(id, token) {
  try {
    let response = await axios.delete(
      `${config.backendurl}/post/delete-post/${id}`,
      {
        headers: {
          "x-auth": token,
        },
      }
    );

    return response.data;
  } catch (error) {
    return false;
  }
}

//File a New Case
async function fileCase(data, token) {
  try {
    let response = await axios.post(
      `${config.backendurl}/case/file-case`,
      {
        headers: {
          "x-auth": token,
        },
      },
      data
    );

    return response.data;
  } catch (error) {
    return false;
  }
}

//Get User Case
async function getUserCase(token) {
  try {
    let response = await axios.get(`${config.backendurl}/case/get-user-case`, {
      headers: {
        "x-auth": token,
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
}

//Get All Case
async function getAllCase(token) {
  try {
    let response = await axios.get(`${config.backendurl}/case/get-all-case`, {
      headers: {
        "x-auth": token,
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
}

//Edit Case
async function editCase(data, token) {
  try {
    let response = await axios.put(
      `${config.backendurl}/case/edit-case`,
      {
        headers: {
          "x-auth": token,
        },
      },
      data
    );

    return response.data;
  } catch (error) {
    return false;
  }
}

//Update Case By Admin
async function updateCase(data, token) {
  try {
    let response = await axios.put(
      `${config.backendurl}/case/update-case`,
      {
        headers: {
          "x-auth": token,
        },
      },
      data
    );

    return response.data;
  } catch (error) {
    return false;
  }
}

//Close Case By User
async function closeCase(id, token) {
  try {
    let response = await axios.put(
      `${config.backendurl}/case/close-case/${id}`,
      {
        headers: {
          "x-auth": token,
        },
      }
    );

    return response.data;
  } catch (error) {
    return false;
  }
}

//Delete Case
async function deleteCase(id, token) {
  try {
    let response = await axios.delete(
      `${config.backendurl}/case/delete-case/${id}`,
      {
        headers: {
          "x-auth": token,
        },
      }
    );

    return response.data;
  } catch (error) {
    return false;
  }
}

export {
  handlelogin,
  handlesignUp,
  fetchData,
  updateUser,
  deleteUser,
  uploadPost,
  addViews,
  getAllPost,
  editPost,
  deletePost,
  fileCase,
  getUserCase,
  getAllCase,
  editCase,
  updateCase,
  closeCase,
  deleteCase,
};
