import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import { getUserPost } from '../container/services';
import PostCard from '../container/PostCard';

const YourPost = () => {
  let [postDatas,setPostDatas]=useState([]);
  let [loading,setLoading]=useState(true);
  let token=localStorage.getItem('token');
  useEffect(()=>{
    async function getPostsData(){
      let posts=await getUserPost(token)
      setPostDatas(posts.post)
      setLoading(false);
    }
    getPostsData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Base Page={"Your Post"}>
      <div className='flex flex-wrap gap-4 p-4 justify-center'>
      {!loading && postDatas.map((data,index)=>(
        <PostCard key={index} data={data}/>
      ))}
      </div>
    </Base>
  )
}

export default YourPost