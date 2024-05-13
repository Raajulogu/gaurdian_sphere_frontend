import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ResetPassword from "./Pages/ResetPassword";
import Dashboard from "./Components/Dashboard";
import Account from "./Components/Account";
import CaseDetails from "./Components/CaseDetails";
import FileCase from "./Components/FileCase";
import Help from "./Components/Help";
import Laws from "./Components/Laws";
import NewPost from "./Components/NewPost";
import OneClick from "./Components/OneClick";
import YourPost from "./Components/YourPost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/account" element={<Account />} />
        <Route path="/case-details" element={<CaseDetails />} />
        <Route path="/file-case" element={<FileCase />} />
        <Route path="/help" element={<Help />} />
        <Route path="/laws" element={<Laws />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/oneclick" element={<OneClick />} />
        <Route path="/your-post" element={<YourPost />} />
      </Routes>
    </div>
  );
}

export default App;
