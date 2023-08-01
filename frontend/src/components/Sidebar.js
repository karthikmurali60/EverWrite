import "./Sidebar.css";
import React from "react";
import NavigationLink from "./NavigationLink";
import Cookies from "js-cookie";

export default function Sidebar(props) {
  const onClickSignOut = async (event) => {
    event.preventDefault();
    Cookies.remove("username");
    Cookies.remove("name");
    window.location.href = `/`;
  };

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
      <button type="submit" className="signout-button" onClick={onClickSignOut}>
        Sign out
      </button>
    </nav>
  );
}
