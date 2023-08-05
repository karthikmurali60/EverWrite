import { ListItemButton, ListItemIcon } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SidebarItem(props) {
  const icon = () => {
    switch (props.handle) {
      case "home":
        return <HomeIcon />;
      case "trash":
        return <DeleteIcon />;
      default:
        break;
    }
  };

  return (
    <ListItemButton
      component={Link}
      to={props.url}
      sx={{
        "&: hover": {
          backgroundColor: "#e4e0e9",
          color: "#000000"
        },
        backgroundColor: props.handle === props.active ? "#fff" : "unset",
        color: props.handle === props.active? "#000000" : "#FFFFFF",
        paddingY: "12px",
        paddingX: "24px",
      }}
    >
      <ListItemIcon
        sx={{
          color: props.handle === props.active? "#000000" : "#FFFFFF",
        }}
      >
        {icon()}
      </ListItemIcon>
      {props.name}
    </ListItemButton>
  );
}
