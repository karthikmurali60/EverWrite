import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const Topbar = (props) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 18%)`,
        ml: "18%",
        boxShadow: "unset",
        backgroundColor: "#e4e0e9",
        color: "#000",
      }}
    >
      <Toolbar>
        <Typography variant="h5" style={{fontWeight: "bold"}}>{props.title}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
