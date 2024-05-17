/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, getAllPost } from "../container/services";
import Base from "../Base/Base";
import PostCard from "../container/PostCard";
import Datas from "../Datas.json";

const Dashboard = () => {
  const [userType, setUserType] = useState("");
  let [postDatas, setPostDatas] = useState([]);
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  useEffect(() => {
    async function getData() {
      let res = await fetchData(token);
      if (res.isAdmin) {
        setUserType("Admin");
      } else {
        setUserType("User");
      }
    }
    if (!token) {
      navigate("/login");
    } else {
      getData();
    }
    async function getPostsData() {
      let posts = await getAllPost(token);
      const duplicatedArray = Array(10).fill(posts.post[0]);
      console.log(duplicatedArray);
      setPostDatas(duplicatedArray);
      setLoading(false);
    }
    getPostsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base Page={"Home"}>
      <div className="flex flex-col md:flex-row md:justify-around px-4 pt-4 space-y-4 md:space-y-0 md:space-x-4 bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="flex flex-col p-3 bg-gray-100 shadow-md rounded-md max-w-md xl:max-w-[500px] h-fit overflow-hidden hidden xl:block bg-yellow-100">
          <h1 className="font-semibold text-xl underline mb-4">
            What you should do after Oneclick?
          </h1>
          {Datas.Questions.map((val, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-[14px] text-justify">
                {index + 1}. {val.Question}
              </h3>
              <p className="pl-4 text-[12px] text-justify">{val.Answer}</p>
            </div>
          ))}
        </div>

        <div className="flex-1 h-[100vh] overflow-y-auto p-4 bg-transparent" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {!loading && <Posts postDatas={postDatas} />}
        </div>

        <div className="flex flex-col p-3 bg-gray-100 shadow-md rounded-md max-w-md xl:max-w-[500px] h-fit overflow-hidden hidden xl:block bg-yellow-100">
          <h1 className="font-semibold text-xl underline mb-4">
            How to Mentally Overcome From Such Incident:
          </h1>
          {Datas.MentalOvercomingTips.map((val, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-[14px] text-justify">
                {index + 1}. {val.Tip}
              </h3>
              <p className="pl-4 text-[12px] text-justify">{val.Description}</p>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

const Posts = ({ postDatas }) => {
  return (
    <div className="flex-1 p-4 flex flex-col items-center gap-4">
      {postDatas?.map((data, index) => (
        <PostCard key={index} data={data} />
      ))}
    </div>
  );
};

export default Dashboard;
