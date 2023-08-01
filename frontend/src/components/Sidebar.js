import "./Sidebar.css";
import React from "react";
import NavigationLink from "./NavigationLink";

export default function Sidebar(props) {
  return (
    // <div><p>Hello</p></div>
    <nav>
      <div className="logo" />
      <p className="user_message">Hello, Eshwar!</p>
      <NavigationLink url="/home" name="Home" handle="home" active="home" />
      <NavigationLink name="Notes" handle="notes" active="home" />
      <hr></hr>
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>
    </nav>
  );
}
