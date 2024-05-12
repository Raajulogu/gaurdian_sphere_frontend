import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import HelpIcon from "@mui/icons-material/Help";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

// eslint-disable-next-line react/prop-types
const Footer = ({ Page }) => {
  const [value, setValue] = React.useState(Page);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#eceff1",
        color: "text.secondary",
        display: { sm: "none" },
        boxShadow: "5px -3px 5px 1px rgba(0, 0, 0, 0.1)",
        zIndex: "10px",
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction label="Home" value="Home" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="OneClick"
        value="OneClick"
        icon={<PowerSettingsNewIcon />}
      />
      <BottomNavigationAction
        label="Case Details"
        value="Case Details"
        icon={<FeedIcon />}
      />
      <BottomNavigationAction
        label="Your Posts"
        value="Your Posts"
        icon={<CollectionsBookmarkIcon />}
      />
      <BottomNavigationAction label="Help" value="Help" icon={<HelpIcon />} />
    </BottomNavigation>
  );
};

export default Footer;
