/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import GavelIcon from "@mui/icons-material/Gavel";
import HelpIcon from "@mui/icons-material/Help";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const SideBar = ({ open, setOpen, Page }) => {
  let navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  // Side Bar data's
  const sideBarDetails = [
    { Name: "Home", Icon: <HomeIcon key={0} />, URL: "/" },
    { Name: "Case Details", Icon: <FeedIcon key={1} />, URL: "/" },
    { Name: "File a Case", Icon: <CreateNewFolderIcon key={2} />, URL: "/" },
    { Name: "New Post", Icon: <PostAddIcon key={3} />, URL: "/" },
    { Name: "Your Posts", Icon: <CollectionsBookmarkIcon key={4} />, URL: "/" },
    { Name: "Laws", Icon: <GavelIcon key={5} />, URL: "/" },
    { Name: "My Account", Icon: <AccountCircle key={6} />, URL: "/" },
    { Name: "Help", Icon: <HelpIcon key={7} />, URL: "/" },
    { Name: "Logout", Icon: <LogoutIcon key={8} />, URL: "/" },
  ];

  return (
    <div>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem
              disablePadding
              sx={{
                backgroundColor: Page === "OneClick" ? "primary.light" : "",
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText primary="OneClick" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {sideBarDetails.map((val, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  backgroundColor: Page === val.Name ? "primary.light" : "",
                }}
              >
                <ListItemButton onClick={() => navigate(`${val.URL}`)}>
                  <ListItemIcon>{val.Icon}</ListItemIcon>
                  <ListItemText primary={val.Name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default SideBar;
