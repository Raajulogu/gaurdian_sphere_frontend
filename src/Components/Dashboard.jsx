/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../container/services";
import Base from "../Base/Base";

const Dashboard = () => {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      async function getData() {
        let res = await fetchData(token);
        if (res.isAdmin) {
          setUserType("Admin");
        } else {
          setUserType("User");
        }
      }
      getData();
    }
  }, []);
  return (
    <Base Page={"Home"}>
      Welcome {userType}
    </Base>
  );
};

export default Dashboard;
