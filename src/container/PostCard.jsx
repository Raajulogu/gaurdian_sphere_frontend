/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostEditModal from "./PostEditModal";
import { addViews, deletePost } from "./services";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { CardActions } from "@mui/material";

const PostCard = ({ data }) => {
  let token = localStorage.getItem("token");
  const isEditPage = location.pathname.includes("/your-post");
  //Edit Modal Setup
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    handleClose();
    setOpenModal(true);
  };
  //Morover Option setup
  const [showNot, setShowNot] = useState(null);
  const handleClickNotification = (event) => {
    setShowNot(event.currentTarget);
  };
  const open = Boolean(showNot);
  const handleClose = () => {
    setShowNot(null);
  };
  let style = {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  };

  //Delete Post
  async function deletepost() {
    let res = await deletePost(data._id, token);
    if (res.message !== "Post Deleted Successfully") {
      alert("Error deleting post please try again later");
    }
    handleClose();
  }

  //Views Increasing setup
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !isEditPage) {
          try {
            await addViews(data._id, token);
            observer.unobserve(cardRef.current);
          } catch (error) {
            console.error("Error increasing view count", error);
          }
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [data.id]);
  return (
    <Card sx={{ maxWidth: 345,height:"fit" }} ref={cardRef}>
      <CardHeader
        sx={{ fontWeight: "bold" }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {data.userName[0]}
          </Avatar>
        }
        action={
          isEditPage && (
            <IconButton aria-label="settings" onClick={handleClickNotification}>
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={data.title}
        subheader={data.date}
      />
      <CardMedia
        component="img"
        height="194"
        image={data.image}
        alt={data.title}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "justify" }}
        >
          {data.details}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <RemoveRedEyeIcon />
          <Typography>{data.views}Views</Typography>
        </IconButton>
      </CardActions>

      {/*MorOver Options*/}
      <Menu
        anchorEl={showNot}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: style,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleOpen}>
          <EditIcon /> Edit
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => deletepost()}>
          <DeleteIcon /> Delete
        </MenuItem>
      </Menu>
      {/*Post Edit Modal*/}
      <PostEditModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        data={data}
      />
    </Card>
  );
};

export default PostCard;
